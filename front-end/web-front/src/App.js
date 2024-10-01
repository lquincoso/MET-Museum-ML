import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
// import Tour from './components/pages/Tour';
// import ArtworkCollection from './components/pages/ArtworkCollection';
// import Education from './components/pages/Education';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
