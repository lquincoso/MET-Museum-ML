# ArtLens Frontend
The frontend of ArtLens consists of two main components:
- Website: A responsive web application built with React.js.
- iOS App: A native application developed using Swift.
Both components provide users with seamless access to the MET's collection, personalized recommendations, and navigation features.

## 🎨 Purpose of the Frontend
The frontend serves as the user interface for interacting with the ArtLens platform, offering:
**Web Application**: A versatile platform for browsing the MET's collection, learning about artworks, and receiving AI-driven recommendations.
**iOS App**: A mobile-first experience tailored for on-the-go users, featuring real-time navigation and similar artwork recommendations.

## Step-by-Step Instructions 

### Web Application Setup ###
1.  Navigate to the web-front directory: 
```bash
cd web-front
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


### iOS Application Setup ###
1. Navigate to the ios-front directory:
```bash
cd ios-front
```
2. Open the Xcode project:
```bash
open MuseumApp.xcodeproj
```
3. Configure the signing settings in Xcode (if required).
4. Build and run the app:
    - Select a simulator or connected device and click the "Run" button in Xcode.
5. API Configuration:
    - Ensure the API base URL is correctly set in the Swift code:
    ```bash
    let apiBaseURL = "http://localhost:5000"
    ```

## 🎨 Features ##
### Website
- Browse artworks from the MET Museum.
- Search for specific pieces using filters.
- View AI-driven artwork recommendations.
- Interact with educational content and insights.

### iOS App
- Navigate galleries with optimized tour planning.
- Favorite and revisit artworks.
- Receive personalized AI-driven artwork recommendations.
