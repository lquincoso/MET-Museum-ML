import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignUp from './pages/Sign-Up';
import Login from './pages/Login';
import ArtworkDetails from './pages/Artwork-Details';


function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/sign-up' element={<SignUp />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/artwork-details' element={<ArtworkDetails />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
