import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
    setCountry: Dispatch<SetStateAction<string|undefined>>;
    setCity: Dispatch<SetStateAction<string|undefined>>;
    setTimeZone: Dispatch<SetStateAction<string|undefined>>;
    setPostalCode: Dispatch<SetStateAction<string|undefined>>;
    setLat: Dispatch<SetStateAction<number>>;
    setLng: Dispatch<SetStateAction<number>>;
    setSent:Dispatch<SetStateAction<boolean>>;
    setError:Dispatch<SetStateAction<boolean>>;
    setErrorMessage:Dispatch<SetStateAction<string>>;
};

function InputComponent({setErrorMessage,setError,setCountry,setCity,setTimeZone,setPostalCode,setLat,setLng,setSent}:Props){
    const url:string='https://findbyip.onrender.com';

    const [inputValue,setInputValue]=useState('');
    const [loading,setLoading]=useState(false);

    type locationRes={
        error?:string;
        Country?:string;
        City?:string;
        TimeZone?:string;
        PostalCode?:string;
        Lat?:number;
        Lng?:number;
    }

    async function handleClick(){
        if(!inputValue.trim()){
            setErrorMessage('Input field is empty');
            setError(true);
            return;
        }

        try{
            setLoading(true);

            const response=await fetch(`${url}/`,{
                method:'POST',
                headers:{
                    "Content-type":"application/json"
                },body:JSON.stringify({
                    req:inputValue
                })
            });

            const data:locationRes=await response.json();

            if(!data||data.error){
                setErrorMessage(data.error||'Something went wrong');
                setError(true);
                return; 
            }

           
            setCountry(data.Country);
            setCountry(data.Country);
            setCity(data.City);
            setTimeZone(data.TimeZone);
            setPostalCode(data.PostalCode);
            setLat(data.Lat||0);
            setLng(data.Lng||0);
            setSent(true);

        }catch(error){
            setErrorMessage('Something went wrong');
            setError(true);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="ring-2 ring-redish-700 flex rounded-md overflow-hidden">
            <input
                className="text-md p-1 md:text-lg md:p-2 lg:text-xl text-redish-100"
                placeholder="Input IP/Email/Domain"
                type="text"
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}
            />
            <button
                onClick={()=>handleClick()}
                className={`
                    ${loading?"cursor-not-allowed opacity-50"
                    :'hover:bg-redish-700 transition-bg duration-250 cursor-pointer'}
                    text-md p-1 md:text-lg md:p-2 lg:text-xl   text-redish-100 bg-darkBlueish-900 border-l-2 border-redish-700
                    `}
            >{loading?'Searching...':'Find Location'}</button>
        </div>
    )


}

export default InputComponent;