# ArtLens Backend
The backend for ArtLens provides the essential APIs and services required to support the application. It powers the frontend (web and iOS) by managing artwork data, machine learning models, and user interactions while also offering administrative tools for museum analytics.

## 🎨 Purpose of the Backend
The backend serves as the foundation for the ArtLens application, with the following key responsibilities:

**Django Framework:**
Manages user data, authentication, and artwork metadata using a structured relational database. Serves as the primary API layer for frontend interactions.

**Flask API:**
Provides dedicated endpoints for:
- Tour Planning: Computes optimized routes for navigating galleries.
- Artwork Recommendations: Leverages ML models to suggest similar artworks.
- Educational Feature: Generates AI-driven insights and links related to artworks.

**Streamlit Dashboard:**
Offers analytics and insights into user interactions, artwork popularity, and system performance, helping museum administrators make informed decisions.

## Step-by-Step Instructions 

### Backend (Django) Setup ###
1.  Navigate to the backend directory: 
```bash
cd django
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
The backend server will start at `http://localhost:8000`.



### Flask API Setup and Execution ###
1. Navigate to the backend directory.

2. Install the required Python dependencies:
```bash
pip install -r requirements.txt
```
3. Run the Flask API:
```bash
python run.py
```
The Flask API will start on `http://localhost:5000`.



### Streamlit Dashboard ###
1. Navigate to the admin_dashboard directory:
```bash
cd admin_dashboard
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
