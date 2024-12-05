import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import './GalleryMap.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', // Green marker for start
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const endIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', // Red marker for end
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

function GalleryMap({ path }) {
  const [galleries, setGalleries] = useState([]);
  const museumCenter = [40.7794, -73.9632];

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/tour/galleries');
        setGalleries(response.data);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
      }
    };

    fetchGalleries();
  }, []);

  const pathCoordinates = path
    .filter(galleryId => galleryId in galleries)
    .map(galleryId => galleries[galleryId].coordinates);

  return (
    <MapContainer center={museumCenter} zoom={18} style={{ height: "600px", width: "100%" }}>
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
      {path.length > 0 && (
        <>
          <Marker
            key="start"
            position={galleries[path[0]].coordinates}
            icon={startIcon}
          >
            <Popup>Start Point: {galleries[path[0]].name}</Popup>
          </Marker>
          <Marker
            key="end"
            position={galleries[path[path.length - 1]].coordinates}
            icon={endIcon}
          >
            <Popup>End Point: {galleries[path[path.length - 1]].name}</Popup>
          </Marker>
        </>
      )}
      {pathCoordinates.length > 1 && (
        <Polyline positions={pathCoordinates} color="blue" />
      )}
    </MapContainer>
  );
}

export default GalleryMap;
