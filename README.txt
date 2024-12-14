 ======================================================================================
| ArtLens: MET Insights - Providing insights into the MET Museum's art collection.     |
 ======================================================================================
A web and ios application that provides an interactive online experience of the Metropolitan Museum of Art through their public API.

==============================================================================================================================================================
 --------------------
|🎨 Project Overview|
 --------------------
This project creates an immersive digital platform for exploring the Metropolitan Museum of Art's extensive collection. Users can discover artworks, learn about different periods and artists, and experience the museum's treasures from anywhere in the world.

==============================================================================================================================================================
 ------------
|🚀 Features|
 ------------
- Browse the MET's extensive collection.
- Search artworks by various criteria.
- View detailed information about each piece.
- Interactive user interface for seamless exploration.
- Personalized artwork recommendations using machine learning.
- Optimized tour planning within galleries.

==============================================================================================================================================================
 --------------
|💻 Tech Stack |
 --------------
Frontend

- React.js for the web application.
- Swift for the iOS application.

Backend

- Django and Flask for APIs and data management
- Poetry for dependency management of the Django API.
- FAISS, ResNet50, and other Python libraries for machine learning models.

==============================================================================================================================================================
 -------------------------
|🛠️ Setup and Installation|
 -------------------------
Prerequisites
-------------
1. Install the following software:
- Node.js (latest version recommended).
- Python 3.x
- Poetry
- Xcode for iOS development (if building for iOS).

2. Clone the repository:
```bash
   git clone https://github.com/lquincoso/ArtLens-MET-Insights.git
   cd ArtLens-MET-Insights
```

Step-by-Step Instructions 
-------------------------

Frontend (Web) Setup 
1. Navigate to the web frontend directory
```bash
cd front-end/web-front
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
The application will be accessible at `http://localhost:3000`.
---------------------------------------------------------------------------

Backend (Django) Setup
1.  Navigate to the backend directory: 
```bash
cd backend/django
``` 
2. Create a virtual environment and activate it:
```bash
poetry shell
```
3. Install dependencies:
```bash
poetry install
```
4. Run the development server:
```bash
python manage.py runserver
```
The backend server will start at `http://localhost:8000`
---------------------------------------------------------------------------
 
Flask API Setup and Execution
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install the required Python dependencies:
```bash
pip install -r requirements.txt
```
3. Run the Flask API:
```bash
python run.py
```
The Flask API will start on `http://localhost:5000`.
4. Purpose of the Flask API:
- Tour: Provides optimized routes through museum galleries.
- Recommendation System: Suggests visually similar artworks using ML models.
- Educational Feature: Offers AI-generated insights and related resources for selected artworks.
---------------------------------------------------------------------------

Streamlit Dashboard
1. Navigate to the admin_dashboard directory:
```bash
cd backend/admin_dashboard
```
2. Install Streamlit if not already installed:
```bash
pip install streamlit
```
3. Streamlit Dashboard
```bash
streamlit run dashboard.py
```
The dashboard will be accessible at `http://localhost:8501`.
4. Purpose of the Dashboard:
- User Interaction Metrics: Analyze visitor interactions, including popular artworks and navigation patterns.
- Artwork Analytics: Identify trending pieces and engagement levels.
- System Monitoring: Track API usage and performance
---------------------------------------------------------------------------   

iOS Application Setup
1. Navigate to the iOS frontend directory:
```bash
cd ios-front/MuseumApp
```
2. Open the MuseumApp.xcodeproj file in Xcode.
3. Configure the signing & team settings (if required).
4. Build and run the application on a simulator or device.

#### Machine Learning Models ####
1. Navigate to the `artwork_recommendation/models/` directory.
2. Download the required ResNet50 model weights:
```bash
python download_model.py
```
3. Ensure the models are correctly placed in the specified directory.

==============================================================================================================================================================
 ------------------
|Project Structure|
 ------------------
The project directory structure is as follows:

Backend
--------
```css
backend/
├── admin_dashboard/
│   ├── dashboard.py
│   ├── keys_example.txt
│   ├── README.md
│   └── requirements.txt
├── artwork_recommendation/
│   ├── app/
│   │   ├── data/
│   │   │   ├── __init__.py
│   │   │   └── cache.pkl
│   │   ├── models/
│   │   │   ├── download_model.py
│   │   │   ├── resnet50_model.pth
│   │   ├── tests/
│   |   |   ├── __init__.py
│   │   │   ├── test_recommender.py
│   │   ├── __init__.py
│   │   ├── met_api.py
│   │   ├── recommender.py
│   │   └── routes.py
│   ├── __init__.py
│   └── README.md
├── django/
│   ├── api/
│   │   ├── migrations/
|   │   │   ├── 0001_initial.py
│   │   |   ├── 0002_alter_profile_email.py
│   │   |   └── 0003_artworkrating.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── tests.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── met_backend/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   ├── manage.py
│   │   └── .env.example
│   ├── manage.py
│   ├── poetry.lock
│   └── pyproject.toml
├── education/
│   ├── __init__.py
│   ├── education_blueprint.py
│   └── requirements.txt
├── tour/
│   ├── data/
│   │   ├── __init__.py
│   │   ├── galleries_generator.py
│   │   └── galleries.json
│   ├── tests/
│   │   ├── __init__.py
│   │   └──  test_app.py
│   ├── __init__.py
│   ├── pathfinding.py
│   ├── tour_blueprint.py
│   └── requirements.txt
├── __init__.py
├── requirements.txt
└── run.py
```

Frontend - iOS
--------------
```css
ios-front/
├── MuseumApp/
│   ├── Fonts/
│   │   ├── OpenSans-Regular.ttf
│   │   ├── OpenSans-SemiBold.ttf
│   │   ├── PlayfairDisplay-Bold.ttf
│   │   └── PlayfairDisplay-SemiBold.ttf
│   ├── MuseumApp/
│   │   ├── Assets.xcassets/
│   │   ├── Authentication/
│   │   ├── Extensions/
│   │   ├── Models/
│   │   ├── Preview Content/
│   │   ├── Services/
│   │   ├── Views/
│   │   ├── ContentView.swift
│   │   ├── Info.plist
│   │   ├── MuseumAppApp.swift
│   │   ├── MuseumTabView.swift
│   │   └── Styles.swift
│   └── MuseumApp.xcodeproj/
│       ├── project.xcworkspace
│       ├── xcuserdata/
│       └── project.pbxproj
└── README.md
```

Frontend - Web Frontend
-----------------------
```css
web-front/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ArtInfo.js
│   │   ├── ArtworkCard.js
│   │   ├── Button.js
│   │   ├── Eduaction.js
│   │   ├── FilterSidebar.js
│   │   ├── GalleryMap.js
│   │   ├── InputField.js
│   │   ├── Navbar.js
│   │   ├── RelatedArt.js
│   │   └── RelatedArtworkCard.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Art-Search.js
│   │   ├── Artwork-Details.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── My-Gallery.js
│   │   ├── Sign-Up.js
│   │   └── Tour.js
│   ├── App.js
│   ├── App.css
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   └── setupTests.js
├── package-lock.json
└── package.json
```

==============================================================================================================================================================
 -----------
|📄 License|
 -----------
This project is licensed under [MIT](https://github.com/twbs/bootstrap/blob/main/LICENSE) License.

==============================================================================================================================================================
 -----------
|👥 Authors|
 -----------
- Lorena A. Quincoso Lugones
- Dory Apollon
- Niccholas Reiz
- Ariel Ramos Perez
- Mauricio Piedra
==============================================================================================================================================================
 -------------------
|🙏 Acknowledgments|
 -------------------
- Special thanks to the Metropolitan Museum of Art for providing the API that made this project possible.
