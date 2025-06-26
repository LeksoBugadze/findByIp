import { useState } from "react";

function InputComponent(){
    const url:String='http://localhost:8080';

    const [inputValue,setInputValue]=useState('');
    const [loading,setLoading]=useState(false);


    type locationRes={
        error?:String;
        location?:String;
    }

    async function handleClick(){
        if(!inputValue.trim()){
            return alert('Input field is empty');
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
                return alert(data.error||'Something went wrong');
            }

            console.log(data.location);


        }catch(error){
            alert(error);

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