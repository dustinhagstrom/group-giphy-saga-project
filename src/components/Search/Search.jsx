import { useDispatch } from "react-redux";

export default function Search () {
    const dispatch = useDispatch()

    const makeSearchGiphyCall = () => {
        console.log("makeSearchGiphyCall called");
        
        //This is going to have the search input box
        dispatch({
            type: "GET_SEARCH_GIPHYS",
        });
    };


    return (
        <>
        <label htmlFor="searchInput"></label>
        <input id="searchInput" placeholder="search terms" type="text"/>
        <button onClick={makeSearchGiphyCall}>Search</button>
        <h1>Hi From Search</h1></>
    )
}