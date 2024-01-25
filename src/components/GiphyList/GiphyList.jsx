// This component will be rendered for the total results and
// for the favorites results.

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GiphyList() {
    const giphyGeneralPurposeReducer = useSelector((state) => state.giphyGeneralPurposeReducer);

    const dispatch = useDispatch();

    // set the initial giphy endpoint to trending
    //! when the user submits some query parameters for a search, we can then change the endpoint to search
    const [endpoint, setEndpoint] = useState("trending");

    // have an api call to the database for Favorites list

    // have an api call to Giphy for the Search list

    const makeGiphyCall = () => {
        console.log("makeGiphyCall called");
        
        dispatch({
            type: "GET_GIPHY_API_CALL",
            payload: { endpoint },
        });
    };

    useEffect(() => {
        makeGiphyCall();
    }, []);

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
