import React from 'react';
import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

const StockList = () => {
    const [stock, setStock] = useState();
    const [watchList, setWatchList] = useState(['GOOGL', 'AMZN', 'MSFT']);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            const responses = [];
            try {
                const responses = Promise.all(finnHub.get("/quote", {
                    params: {
                        symbol: 'GOOGL'
                    }
                }), finnHub.get("/quote", {
                    params: {
                        symbol: 'MSFT'
                    }
                }), finnHub.get("/quote", {
                    params: {
                        symbol: 'AMZN'
                    }
                }))
                console.log(responses);
                if (isMounted) {
                    setStock(responses);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();

        return () => (isMounted = false)
    }, [])

    return (
        <div>
            StockList
        </div>
    );
};

export default StockList;