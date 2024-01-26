import { useState } from "react";
import CategoryList from "../CategoryList/CategoryList";

export default function GiphyComponent({ giphyObj }) {

    const [toggleCategories, setToggleCategories] = useState(true);

    const toggleImgAndCat = () => {
        setToggleCategories(!toggleCategories);
    }
    
    return (
        <>
            {toggleCategories? <img src={giphyObj.url} onClick={toggleImgAndCat}/> : <CategoryList giphyObj={giphyObj} toggleImgAndCat={toggleImgAndCat}/>}
        </>
    );
}
