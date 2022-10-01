import React, {useContext} from 'react';
import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
import {WatchListContext} from "../context/watchListContext";

const AutoComplete = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const { addStock, deleteStock } = useContext(WatchListContext);

    const renderDropdown = () => {
        const dropDownClass =  search ? 'show' : null;
        return (
            <ul
                className={`dropdown-menu ${dropDownClass}`}
                style={{maxHeight: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer"}}
            >
                {results.map((result) => {
                    return (
                        <li
                            key={result.symbol}
                            className="dropdown-item"
                            onClick={() => {
                                addStock(result.symbol);
                                setSearch('');
                            }}
                        >
                            {result.description} ({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    };

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finnHub.get('/search', {
                    params: {
                        q: search
                    }
                })

                setResults(response.data.result)
            } catch (e) {
                console.log(e);
            }
        };
        if (search.length > 0) {
            fetchData();
        } else {
            setResults([ ])
        }

        return () => {isMounted = false}
    }, [search])

    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input
                    style={{backgroundColor: "rgba(145, 158, 171, 0.04)"}}
                    id="search"
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                >

                </input>
                <label htmlFor="search">Search</label>
                {renderDropdown()}
                {/*<ul className="dropdown-menu show">*/}
                {/*    <li>Stock1</li>*/}
                {/*    <li>Stock2</li>*/}
                {/*    <li>Stock3</li>*/}
                {/*</ul>*/}
            </div>
        </div>
    );
};

export default AutoComplete;