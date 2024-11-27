# ArtLens: MET Insights - Providing insights into the MET Museum's art collection, a nice blend of exploration and analysis.

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

### Backend

- Django
- Poetry

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
   python manage.py runserver
   ```
   The backend server will start at `http://localhost:8000`

## 📄 License

## 👥 Authors

- Lorena A. Quincoso Lugones
- Dory Apollon
- Niccholas Reiz
- Ariel Ramos Perez
- Mauricio Piedra

## 🙏 Acknowledgments

- Metropolitan Museum of Art for providing the API
