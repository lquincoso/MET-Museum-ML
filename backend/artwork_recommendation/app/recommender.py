import torch
import torchvision.models as models
import torchvision.transforms as transforms
import pickle
import requests
import io
import numpy as np
import faiss
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
import os
import asyncio
import aiohttp
from concurrent.futures import ThreadPoolExecutor
import logging

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from artwork_recommendation.app.met_api import get_artwork_by_id

# Logging config
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Loading Model at Server Startup
MODEL_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'models', 'resnet50_model.pth'))
model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V1)
model = torch.nn.Sequential(*list(model.children())[:-1])

try:
    model.load_state_dict(torch.load(MODEL_PATH, weights_only=True))
except Exception as e:
    logger.error(f"Error loading model: {e}")

model.eval()

# Image Preprocessing Transf
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Function to Extract Features from an Image
#TODO docstrings
def extract_features(image):
    image = transform(image).unsqueeze(0)
    with torch.no_grad():
        features = model(image)
    return features.squeeze().numpy()

# Function to Group Artworks by Metadata
# TODO docstrings
def group_artworks_by_metadata(artwork_ids):
    grouped_artworks = {}
    for artwork_id in artwork_ids:
        artwork_data = get_artwork_by_id(artwork_id)
        if artwork_data:
            period = artwork_data.get('period', 'Unknown')
            
            # grouping based on period
            group_key = f"{period}"
            if group_key not in grouped_artworks:
                grouped_artworks[group_key] = []
            grouped_artworks[group_key].append(artwork_id)
    return grouped_artworks

# Loading Cached Feature Vectors if Available
CACHE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), 'data', 'cache.pkl'))
logger.info(f"Looking for cache file at: {CACHE_PATH}")

# Loading Cached Feature Vectors if Available
if os.path.exists(CACHE_PATH):
    with open(CACHE_PATH, 'rb') as f:
        cache = pickle.load(f)
        logger.info("Cache file found and loaded.")
else:
    cache = {}
    logger.info("Cache file not found, starting with empty cache.")

# Preparing FAISS Index if Cached Features Exist
artwork_ids = list(cache.keys())
if cache:
    features_array = np.array(list(cache.values()), dtype='float32')
    index = faiss.IndexFlatL2(features_array.shape[1])  # L2 distance for similarity
    index.add(features_array)
else:
    index = faiss.IndexFlatL2(2048)

# Function to Preprocess and Cache Grouped Artworks
#TODO docstrings
def preprocess_grouped_artworks(grouped_artworks):
    for group_key, artwork_ids in grouped_artworks.items():
        for artwork_id in artwork_ids:
            if artwork_id not in cache:
                artwork_data = get_artwork_by_id(artwork_id)
                if not artwork_data or not artwork_data.get("primaryImage"):
                    continue

                image_url = artwork_data["primaryImage"]
                try:
                    response = requests.get(image_url, timeout=10) 
                    if response.status_code == 200:
                        image = Image.open(io.BytesIO(response.content)).convert('RGB')
                        features = extract_features(image).astype('float32')

                        # Adding extracted features to cache
                        cache[artwork_id] = features
                        # Updating FAISS index
                        index.add(features.reshape(1, -1))
                except requests.exceptions.RequestException as e:
                    logger.error(f"Error fetching image for artwork ID {artwork_id}: {e}")

# Grouping artworks before Processing stage
all_artwork_ids = [artwork_id for artwork_id in range(436500, 437000)]
logger.info("Grouping artworks by metadata...")
grouped_artworks = group_artworks_by_metadata(all_artwork_ids)
logger.info("Preprocessing grouped artworks...")
preprocess_grouped_artworks(grouped_artworks)

    
# Function to Fetch Artwork Image
# TODO docstrings
async def fetch_image(session, url):
    try:
        # Attempting to get the image from the URL with a 30-second timeout
        async with session.get(url, timeout=30) as response:
            if response.status == 200:
                # If the request is successful, read the image data
                image_data = await response.read()
                return Image.open(io.BytesIO(image_data)).convert('RGB')
            else:
                logger.error(f"Failed to fetch image, status code: {response.status}")
                return None
    except Exception as e:
        logger.error(f"Error during async image fetch: {e}")
        return None


# Function to Recommend Similar Artworks within a Group
#TODO docstrings
async def recommend_artworks(artwork_id):
    artwork_data = get_artwork_by_id(artwork_id)
    if not artwork_data:
        return []

    period = artwork_data.get('period', 'Unknown')
    group_key = f"{period}"

    if group_key not in grouped_artworks:
        return []

    group_artwork_ids = grouped_artworks[group_key]

    if artwork_id in cache:
        logger.info(f"Using cached features for artwork ID {artwork_id}")
        target_features = cache[artwork_id]
    else:
        if not artwork_data.get("primaryImage"):
            return []

        image_url = artwork_data["primaryImage"]
        async with aiohttp.ClientSession() as session:
            image = await fetch_image(session, image_url)
            if image is None:
                return []

        # Extracting Features for Target Image
        loop = asyncio.get_event_loop()
        with ThreadPoolExecutor() as pool:
            target_features = await loop.run_in_executor(pool, extract_features, image)
        target_features = target_features.astype('float32')

        # Adding extracted features to cache
        cache[artwork_id] = target_features
        
        index.add(target_features.reshape(1, -1))
        artwork_ids.append(artwork_id)

    # Preparing Group-Specific FAISS Index
    group_features = [cache[art_id] for art_id in group_artwork_ids if art_id in cache]
    group_features_array = np.array(group_features, dtype='float32')
    group_index = faiss.IndexFlatL2(group_features_array.shape[1])
    group_index.add(group_features_array)

    # Performing FAISS Similarity Search within the Group
    _, similar_indices = group_index.search(target_features.reshape(1, -1), 6)
    similar_artworks = [group_artwork_ids[idx] for idx in similar_indices[0] if group_artwork_ids[idx] != artwork_id]
    return similar_artworks

# Saving cache to Disk
#TODO docstrings
def save_cache():
    with open(CACHE_PATH, 'wb') as f:
        pickle.dump(cache, f)
    logger.info("Cache saved.")

# Saving the cache when the script ends
import atexit
atexit.register(save_cache)