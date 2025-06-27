import { useEffect, useState } from "react"
import 'leaflet/dist/leaflet.css';

import MapComponent from "./MapComponent";
import InputComponent from "./InputComponent"
import InfoComponent from "./InfoComponent";
import ErrorMessage from "./ErrorMessage";

function App() {
  const [country,setCountry]=useState<string|undefined>('');
  const [city,setCity]=useState<string|undefined>('');
  const [timeZone,setTimeZone]=useState<string|undefined>('');
  const [postalCode,setPostalCode]=useState<string|undefined>('');
  const [lat,setLat]=useState<number>(0);
  const [lng,setLng]=useState<number>(0);
  const [sent,setSent]=useState<boolean>(false);

  const [error,setError]=useState<boolean>(false);
  const [errorMessage,setErrorMessage]=useState<string>('');

  useEffect(()=>{
    const id=setTimeout(()=>{
      setError(false);
    },2000)

    return ()=> clearInterval(id);
  },[error])

  return (
    <main className="h-screen flex flex-col items-center justify-evenly ">
      <InputComponent setErrorMessage={setErrorMessage} setError={setError} setCountry={setCountry} setCity={setCity} setTimeZone={setTimeZone} setPostalCode={setPostalCode} setLat={setLat} setLng={setLng} setSent={setSent}/>
      {sent&&
        <div className="flex flex-col relative w-full justify-evenly">
          <InfoComponent country={country} city={city} timeZone={timeZone} postalCode={postalCode} lat={lat} lng={lng}/>
          <MapComponent lat={lat} lng={lng}/>
        </div>
      }

      {error &&
        <ErrorMessage message={errorMessage}/>
      }
    </main>
  )
}

export default App
