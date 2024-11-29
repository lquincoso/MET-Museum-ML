import React, { useState } from 'react'; 
import axios from 'axios';
import GalleryMap from '../components/GalleryMap'; 
import './Tour.css';

function Tour() {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [path, setPath] = useState([]);

    const handleTourSubmit = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/api/shortest-path`, {
                params: {
                    start: start,
                    end: end
                }
            });
            setPath(response.data.path);
        } catch (error) {
            console.error("Error fetching the path:", error);
            alert("An error occurred while trying to fetch the path. Please try again.");
        }
    };

    return (
        <div className="tour-container">
            <h1>Tour</h1>
            <div className="input-group">
                <label>Start Gallery ID:</label>
                <input type="text" value={start} onChange={(e) => setStart(e.target.value)} />
            </div>
            <div className="input-group">
                <label>End Gallery ID:</label>
                <input type="text" value={end} onChange={(e) => setEnd(e.target.value)} />
            </div>
            <button className="find-path-button" onClick={handleTourSubmit}>Find Shortest Path</button>

            <div className="map-section">
                <h2>Gallery Map</h2>
                <GalleryMap path={path} />
            </div>
        </div>
    );
}

export default Tour;
