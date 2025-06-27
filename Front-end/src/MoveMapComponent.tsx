import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MoveMapComponent({lat,lng}:{lat:number,lng:number}){
    const map=useMap();
    useEffect(()=>{
        map.setView([lat,lng]);
    },[lat,lng])

    return null;
}

export default MoveMapComponent;