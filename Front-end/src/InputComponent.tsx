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


            const response=await fetch(`${url}?ip=${inputValue}`);
            const data:locationRes=await response.json();

            if(!data||data.error){
                return alert(data.error||'Something went wrong');
            }




        }catch(error){
            console.log(error);

        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="flex flex-col gap-5">
            <input
                className="ring-2 ring-redish-700 text-xl p-2 text-redish-100 rounded-md"
                placeholder="Input IP Address"
                type="text"
                value={inputValue}
                onChange={(e)=>{setInputValue(e.target.value)}}
            />
            <button
                onClick={()=>handleClick()}
                className={`
                    ${loading?"cursor-not-allowed opacity-50"
                    :'hover:bg-redish-700 transition-bg duration-250 cursor-pointer'}
                    ring-2 text-xl p-2 ring-redish-700 text-redish-100 rounded-md
                    `}
            >Find Location</button>
        </div>
    )


}

export default InputComponent;