// context <API></>
//useContext hooks

// context(warehouse)
//  provider (delivery)
//consumer / (useContext(   you  ))
import React, { useContext, useEffect, useState } from "react";

export const API_URL = ``https://www.omdbapi.com/?apikey=d26ccc9d``;
const AppContext = React.createContext();

// we need to create a provider fun 
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show:"false", msg:""})
    const [query, setQury] = useState("titanic");

    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setMovie(data.Search);
            }else{
                setIsError({
                    show: true,
                    msg: data.Error,
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 500);

        return ()=>clearTimeout(timerOut);
        
    }, [query]);

    return (<AppContext.Provider value={{ isLoading, isError, query, setQury, movie}}>
        {children}
    </AppContext.Provider>
    )
};

// global custom hooks 
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
