type props={
    country:string|undefined;
    city:string|undefined;
    timeZone:string|undefined;
    postalCode:string|undefined;
    lat:number;
    lng:number;
}

function InfoComponent({country,city,timeZone,postalCode,lat,lng}:props){
    const arr:any[]=[
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
        <div className="flex ring-redish-700 text-redish-500 self-center flex-wrap justify-center">
            {arr.map((e,i)=>{
                return (
                <div key={i} className="flex flex-col items-center p-1 lg:p-2 border-2">
                    <h1 className="text-sm lg:text-md">{e.label}</h1>
                    <h2 className="text-md lg:text-xl text-redish-100">{e.data}</h2>
                </div>
                )
            })}
        </div>
    )

}

export default InfoComponent;