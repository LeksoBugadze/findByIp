import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import MoveMapComponent from './MoveMapComponent';


type Props={
  lat:number;
  lng:number;
}

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({lat,lng}:Props){  
  return (
    <MapContainer center={[lat,lng]} zoom={13} style={{ height:'400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MoveMapComponent lat={lat} lng={lng} ></MoveMapComponent>
      <Marker position={[lat,lng]}></Marker>
    </MapContainer>
  );
}

export default MapComponent;