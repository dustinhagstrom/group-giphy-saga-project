import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom"

export default function CategoryList({ giphyObj, toggleImgAndCat }) {
    // const history = useHistory();
    const dispatch = useDispatch();
    const categoryReducer = useSelector((state) => state.categoryReducer);

    // const navigateHome = () => {
    //     history.push("/");
    // }

    const fetchCategories = () => {
        dispatch({
            type: "GET_CATEGORIES",
        });
    };

    const setCategory = (category) => {
        console.log("you clicked on category id:", category.id);

        console.log("giphy obj id:", giphyObj.id);

        // dispatch to hit the database
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
            {/* <p onClick={setCategory}>none</p> */}
            {/* <button onClick={navigateHome}>Go Home</button> */}
        </>
    );
}
