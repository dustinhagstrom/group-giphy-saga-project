import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GiphyFavList() {
    const giphyFavoritesReducer = useSelector((state) => state.giphyFavoritesReducer);

    const dispatch = useDispatch();

    // have an api call to the database for Favorites list

    // Func called to load page with trending gifs on load in use effect.
    const makeFavoriteGiphyCall = () => {
        // console.log("makeTrendingGiphyCall called");
        
        dispatch({
            type: "GET_FAVORITE_GIPHYS",
        });
    }; 

    //! Comment out to preserve request limits for free api calls
    useEffect(() => {
        makeTrendingGiphyCall();
    }, []);

    return (
        <>
            <h1>Hi From GiphyFavList</h1>
            <ul>
                {giphyFavoritesReducer.map((url, i) => {
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
