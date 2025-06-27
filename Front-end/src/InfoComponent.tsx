import type { Dispatch,SetStateAction } from "react";

type props={
    country:Dispatch<SetStateAction<string>>;
    city:Dispatch<SetStateAction<string>>;
    timeZone:Dispatch<SetStateAction<string>>;
    postalCode:Dispatch<SetStateAction<string>>;
    lat:Dispatch<SetStateAction<number>>;
    lng:Dispatch<SetStateAction<number>>;
}

function InfoComponent({country,city,timeZone,postalCode,lat,lng}:props){
    const arr=[
        {
            label:"Country",
            data:country
        },{
            label:"City",
            data:city
        },{
            label:"Time Zone",
            data:timeZone
        },{
            label:"Latitude",
            data:lat
        },{
            label:"Longitude",
            data:lng
        },{
            label:"Postal Code",
            data:postalCode
        },
    ]
    
    return(
        <div>
            
        </div>
    )

}

export default InfoComponent;