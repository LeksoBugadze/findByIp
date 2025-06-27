function ErrorMessage({message}:{message:string}){
    return(
        <div className="fade-in-out top-10 fixed p-3 ring-2 ring-redish-700">
            <h1 className="text-2xl lg:text-4xl text-center text-redish-700">{message}</h1>
        </div>
    )
}

export default ErrorMessage;