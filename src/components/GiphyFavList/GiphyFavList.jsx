import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import GiphyComponent from "../GiphyComponent/GiphyComponent";

export default function GiphyFavList() {


    const giphyFavoritesReducer = useSelector((state) => state.giphyFavoritesReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const makeFavoriteGiphyCall = () => {
        dispatch({
            type: "GET_FAVORITE_GIPHYS",
        });
    }; 

    const navigateHome = () => {
        history.push("/");
    }

    //! Comment out to preserve request limits for free api calls
    useEffect(() => {
        makeFavoriteGiphyCall();
    }, []);

    return (
        <>
            <h1>Hi From GiphyFavList</h1>
            <Button variant="text" onClick={navigateHome}>Home</Button>
            <ul>
                {giphyFavoritesReducer.map((giphyObj) => {
                    return (
                        <li key={giphyObj.id}>
                            <GiphyComponent giphyObj={giphyObj} displayFavorite={false}/>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
