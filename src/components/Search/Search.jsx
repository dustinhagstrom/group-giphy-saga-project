import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Search() {
    const [searchString, setSearchString] = useState("");

    const dispatch = useDispatch();
    const history = useHistory();

    // gonna use a String.replaceAll(" ", "%20"); to replace all spaces in the input

    const handleInputOnChange = (e) => {
        setSearchString(e.target.value);
    };

    const makeSearchGiphyCall = () => {
        console.log("makeSearchGiphyCall called");

        // replace all spaces with the url code for space chars
        let urlSafeString = searchString.replaceAll(" ", "%20");

        //This is going to have the search input box
        dispatch({
            type: "GET_SEARCH_GIPHYS",
            payload: { query: urlSafeString },
        });
    };

    const navigateToFavorites = () => {
        console.log("navigateToFavorites called");

        history.push("/favorites");
    }

    return (
        <>
            <label htmlFor="searchInput"></label>
            <input
                id="searchInput"
                placeholder="search terms"
                type="text"
                maxLength={50}
                onChange={handleInputOnChange}
                value={searchString}
            />
            <button onClick={makeSearchGiphyCall}>Search</button>
            <button onClick={navigateToFavorites}>Go To Favs</button>
        </>
    );
}
