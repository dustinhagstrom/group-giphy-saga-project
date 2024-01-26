import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GiphyComponent from "../GiphyComponent/GiphyComponent";

export default function GiphyFavList() {
    const giphyFavoritesReducer = useSelector((state) => state.giphyFavoritesReducer);

    const dispatch = useDispatch();

    // Func called to load page with trending gifs on load in use effect.
    const makeFavoriteGiphyCall = () => {
        // console.log("makeTrendingGiphyCall called");
        
        dispatch({
            type: "GET_FAVORITE_GIPHYS",
        });
    }; 

    //! Comment out to preserve request limits for free api calls
    useEffect(() => {
        makeFavoriteGiphyCall();
    }, []);
// console.log("giphyFavoritesReducer:", giphyFavoritesReducer);
    return (
        <>
            <h1>Hi From GiphyFavList</h1>
            <ul>
                {giphyFavoritesReducer.map((giphyObj) => {
                    // console.log("giphyFavoritesReducer:", giphyFavoritesReducer);
                    // console.log("urlObj:", giphyObj);
                    return (
                        <li key={giphyObj.id}>
                            {/* <img src={urlObj.url} /> */}
                            <GiphyComponent giphyObj={giphyObj} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
