import React, {createContext} from 'react';
import { useState, useEffect, useContext } from "react";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill } from "react-icons/bs";
import { BsFillCaretUpFill } from "react-icons/bs";
import {WatchListContext} from "../context/watchListContext";

const StockList = () => {
    const [stock, setStock] = useState([]);
    const { watchList } = useContext(WatchListContext);

    const changeTextColor = (value) => {
        return value < 0 ? 'danger' : 'success';
    };

    const renderIcon = (value) => {
      return value < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;
    };

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnHub.get('/quote', {
                        params: {
                            symbol: stock
                        }
                    });
                }));

                const data = responses.map(( response) => {
                    return {
                       data: response.data,
                       symbol: response.config.params.symbol
                    }
                });

                console.log(data)
                if (isMounted) {
                    setStock(data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();

        return () => (isMounted = false)
    }, [watchList])

    return (
        <div>
            <table className="table hover mt-5">
                <thead style={{color: 'rgb(79, 89, 102)'}}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Last</th>
                        <th scope="col">Chg</th>
                        <th scope="col">Chg%</th>
                        <th scope="col">High</th>
                        <th scope="col">Low</th>
                        <th scope="col">Open</th>
                        <th scope="col">Close</th>
                    </tr>
                </thead>
                <tbody>
                    {stock.map((stockData) => {
                        return (
                            <tr className="table-row" key={stockData.symbol}>
                                <th scope="row">{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td
                                    className={`text-${changeTextColor(stockData.data.d)}`}
                                >
                                    {stockData.data.d} {renderIcon(stockData.data.d)}
                                </td>
                                <td
                                    className={`text-${changeTextColor(stockData.data.dp)}`}
                                >
                                    {stockData.data.dp} {renderIcon(stockData.data.dp)}
                                </td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default StockList;