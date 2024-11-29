import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import './GalleryMap.css';

// Icon settings for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Function to refresh the map when the component changes
function MapRefresher() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize(); // Ensure the map knows its dimensions and refreshes tiles
  }, [map]);
  return null;
}

function GalleryMap({ path }) {
  const [galleries, setGalleries] = useState({});
  const museumCenter = [40.7794, -73.9632]; // The MET Museum


  useEffect(() => {
    // Fetch the gallery data from your backend
    const fetchGalleries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/galleries');
        setGalleries(response.data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };
    fetchGalleries();
  }, []);

  // Get coordinates for the path
  const pathCoordinates = path
    .filter(galleryId => galleryId in galleries && galleries[galleryId].coordinates)
    .map(galleryId => galleries[galleryId].coordinates);

  return (
    <MapContainer center={museumCenter} zoom={18} style={{ height: "600px", width: "100%" }}>
      <MapRefresher />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Object.entries(galleries).map(([galleryId, gallery]) => (
        <Marker
          key={galleryId}
          position={gallery.coordinates}
        >
          <Popup>
            <strong>{gallery.name}</strong><br />
            Gallery ID: {galleryId}<br />
            Number of Artworks: {gallery.artworks.length}
          </Popup>
        </Marker>
      ))}
      {pathCoordinates.length > 1 && (
        <Polyline positions={pathCoordinates} color="blue" />
      )}
    </MapContainer>
  );
}

export default GalleryMap;
