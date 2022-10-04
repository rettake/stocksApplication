import React, {createContext, useEffect, useState} from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = ({children}) => {
    const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('watchList')) || ['GOOGL', 'AMZN', 'MSFT']);

    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock]);
        }
    };

    const deleteStock = (stock) => {
        setWatchList(watchList.filter((item) => {
            return item !== stock;
        }));
    };

    useEffect(() => {
        localStorage.setItem('watchList', JSON.stringify(watchList));
    }, [watchList])

    return (
        <WatchListContext.Provider value={{watchList, setWatchList, addStock, deleteStock }}>
            {children}
        </WatchListContext.Provider>
    )
}

