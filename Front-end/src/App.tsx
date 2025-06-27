import { useState } from "react"
import InputComponent from "./InputComponent"
import 'leaflet/dist/leaflet.css';

import MapComponent from "./MapComponent";

function App() {
  const [country,setCountry]=useState<string|undefined>('');
  const [city,setCity]=useState<string|undefined>('');
  const [timeZone,setTimeZone]=useState<string|undefined>('');
  const [postalCode,setPostalCode]=useState<string|undefined>('');
  const [lat,setLat]=useState<number>(0);
  const [lng,setLng]=useState<number>(0);
  const [sent,setSent]=useState<boolean>(false);

  return (
    <main className="h-screen grid grid-row-[1fr 1fr] items-center justify-center">
      <InputComponent setCountry={setCountry} setCity={setCity} setTimeZone={setTimeZone} setPostalCode={setPostalCode} setLat={setLat} setLng={setLng} setSent={setSent}/>
      {sent&&
        <>
          
          <MapComponent lat={lat} lng={lng}/>
        </>
      }
    </main>
  )
}

export default App
