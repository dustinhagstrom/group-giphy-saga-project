import { useState } from "react";
import CategoryList from "../CategoryList/CategoryList";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from "react-redux";

export default function GiphyComponent({ giphyObj }) {

    const [toggleCategories, setToggleCategories] = useState(true);

    const dispatch = useDispatch();

    const toggleImgAndCat = () => {
        setToggleCategories(!toggleCategories);
    }

    function makeFavorite () {
        dispatch({
            type: "MAKE_FAVORITE",
            payload: { id: giphyObj.id }
        })

    }
    
    return (
        <>
            {toggleCategories? (<IconButton onClick={makeFavorite}> <img src={giphyObj.url} onClick={toggleImgAndCat}/> <FavoriteIcon /> </IconButton>): <CategoryList giphyObj={giphyObj} toggleImgAndCat={toggleImgAndCat}/>}

        </>
    );
}
