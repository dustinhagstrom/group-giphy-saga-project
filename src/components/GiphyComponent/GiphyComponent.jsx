import { useState } from "react";
import CategoryList from "../CategoryList/CategoryList";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";

export default function GiphyComponent({ giphyObj, displayFavorite }) {
    const [toggleCategories, setToggleCategories] = useState(true);

    const dispatch = useDispatch();

    const toggleImgAndCat = () => {
        setToggleCategories(!toggleCategories);
    };

    function makeFavorite() {
        dispatch({
            type: "MAKE_FAVORITE",
            payload: { id: giphyObj.id },
        });
    }

    return (
        <>
            {toggleCategories ? (
                <>
                    {displayFavorite ? (
                        <IconButton onClick={makeFavorite}>
                            <img src={giphyObj.url} />
                            <FavoriteIcon />
                        </IconButton>
                    ) : (
                        <img src={giphyObj.url} />
                    )}
                    <div>
                        <Button variant="text" onClick={toggleImgAndCat}>
                            Apply Category
                        </Button>
                    </div>
                </>
            ) : (
                <CategoryList
                    giphyObj={giphyObj}
                    toggleImgAndCat={toggleImgAndCat}
                />
            )}
        </>
    );
}
