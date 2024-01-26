// This component will be rendered for the total results and
// for the favorites results.

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GiphyList() {
    const giphyGeneralPurposeReducer = useSelector((state) => state.giphyGeneralPurposeReducer);

    const dispatch = useDispatch();

    // have an api call to the database for Favorites list

    // Func called to load page with trending gifs on load in use effect.
    const makeTrendingGiphyCall = () => {
        // console.log("makeTrendingGiphyCall called");
        
        dispatch({
            type: "GET_TRENDING_GIPHYS",
        });
    }; 

    //! Commented out to preserve request limits for free api calls
    // useEffect(() => {
    //     makeTrendingGiphyCall();
    // }, []);

    return (
        <>
            <h1>Hi From GiphyList</h1>
            <ul>
                {giphyGeneralPurposeReducer.map((url, i) => {
                    return (
                        <li key={i}>
                            <img src={url} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
