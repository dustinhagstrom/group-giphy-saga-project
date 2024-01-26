import { useState } from "react";
import CategoryList from "../CategoryList/CategoryList";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";

export default function GiphyComponent({ imageUrl }) {

    const dispatch = useDispatch();

    function makeFavorite() {
        dispatch({
            type: "MAKE_FAVORITE",
            payload: { url: imageUrl },
        });
    }

    return (
        <>
                    <IconButton onClick={makeFavorite}>
                        <img src={imageUrl} />
                        <FavoriteIcon />
                    </IconButton>
        </>
    );
}
