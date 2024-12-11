# ArtLens: MET Insights - Providing insights into the MET Museum's art collection.

A web and ios application that provides an interactive online experience of the Metropolitan Museum of Art through their public API.

## 🎨 Project Overview

This project creates an immersive digital platform for exploring the Metropolitan Museum of Art's extensive collection. Users can discover artworks, learn about different periods and artists, and experience the museum's treasures from anywhere in the world.

## 🚀 Features

- Browse the Met's extensive collection
- Search artworks by various criteria
- View detailed information about each piece
- Interactive user interface for seamless exploration

## 💻 Tech Stack

### Frontend

- React.js
- Swift

### Backend

- Django
- Poetry
- Flask

## 🛠️ Installation

### Prerequisites

- Node.js and npm
- Python 3.x
- Poetry

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/lquincoso/MET-Museum-ML.git
   cd MET-Museum-ML
   ```

2. **Frontend Setup**

   ```bash
   cd front-end/web-front
   npm install
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

3. **Backend Setup**
   Open a new terminal and run:
   ```bash
   cd backend/Django
   poetry shell
   poetry intall
   python manage.py runserver
   ```
   The backend server will start at `http://localhost:8000`

## Project Structure
The project directory structure is as follows:

### Backend
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

### Frontend - iOS
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

### Frontend - Web Frontend
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


## 📄 License

## 👥 Authors

- Lorena A. Quincoso Lugones
- Dory Apollon
- Niccholas Reiz
- Ariel Ramos Perez
- Mauricio Piedra

## 🙏 Acknowledgments

- Metropolitan Museum of Art for providing the API
