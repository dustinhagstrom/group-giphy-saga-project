import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CategoryList({ giphyObj, toggleImgAndCat }) {
    
    const dispatch = useDispatch();
    const categoryReducer = useSelector((state) => state.categoryReducer);

    const fetchCategories = () => {
        dispatch({
            type: "GET_CATEGORIES",
        });
    };

    const setCategory = (category) => {
        dispatch({
            type: "UPDATE_CATEGORY",
            payload: { giphy_id: giphyObj.id, category_id: category.id },
        });

        toggleImgAndCat();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            {categoryReducer.map((category) => {
                return (
                    <p key={category.id} onClick={() => setCategory(category)}>
                        {category.name}
                    </p>
                );
            })}
            
        </>
    );
}
