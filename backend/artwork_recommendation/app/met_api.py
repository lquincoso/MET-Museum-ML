import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry

BASE_ENDPOINT = "https://collectionapi.metmuseum.org/public/collection/v1/"
SEARCH_ENDPOINT = BASE_ENDPOINT + "search"

session = requests.Session()
retries = Retry(total=5, backoff_factor=1, status_forcelist=[500, 502, 503, 504])
session.mount('https://', HTTPAdapter(max_retries=retries))

def search_artworks(query):
    params = {"q": query}
    response = requests.get(SEARCH_ENDPOINT, params=params)
    if response.status_code == 200:
        data = response.json()
        return data.get("objectIDs", [])
    return []

def get_artwork_by_id(artwork_id):
    url = BASE_ENDPOINT + "objects/" + str(artwork_id)
    try:
        response = session.get(url, timeout=30)
        if response.status_code == 200:
            return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching artwork with ID {artwork_id}: {e}")
    return None

