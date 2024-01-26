import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GiphyComponent from "../GiphyComponent/GiphyComponent.jsx";

export default function GiphyList() {
    const giphyTrendingReducer = useSelector((state) => state.giphyTrendingReducer);

    const dispatch = useDispatch();

    const makeTrendingGiphyCall = () => {
        dispatch({
            type: "GET_TRENDING_GIPHYS",
        });
    }; 

    //! Commented out to preserve request limits for free api calls
    useEffect(() => {
        makeTrendingGiphyCall();
    }, []);

    return (
        <>
            <h1>Hi From GiphyList</h1>
            <ul>
                {giphyTrendingReducer.map((url, i) => {
                    return (
                        <li key={i}>
                            <GiphyComponent imageUrl={url} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
