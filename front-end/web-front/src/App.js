import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/Sign-Up";
import Login from "./pages/Login";
import ArtSearch from "./pages/Art-Search";
import ArtworkDetails from "./pages/Artwork-Details";
import MyGallery from "./pages/My-Gallery";
import Tour from "./pages/Tour";
import 'leaflet/dist/leaflet.css';
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
            <Route path="/my-gallery" element={<MyGallery />} />
            <Route path="/art-collection" element={<ArtSearch />} />
            <Route path="/tour" element={<Tour />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
