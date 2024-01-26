import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

const giphyTrendingReducer = (state = [], action) => {
    if (action.type === "SET_GIFS") {
        return action.payload;
    }
    return state;
};

const giphyFavoritesReducer = (state = [], action) => {
    if (action.type === "SET_FAVORITES") {
        return action.payload;
    }
    return state;
};

const categoryReducer = (state = [], action) => {
    if (action.type === "SET_CATEGORIES"){
        return action.payload;
    }
    return state;
}

//! Generator functions below
function* getTrendingGifs(action) {
    const arrayOfUrls = [];

    try {
        const giphyUrlArray = yield axios.get("/api/giphy");
        yield put({
            type: "SET_GIFS",
            payload: giphyUrlArray.data,
        });
    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
}

function* getSearchGifs(action) {

    try {
        const giphyUrlArray = yield axios.post("/api/giphy", action.payload);
        yield put({
            type: "SET_GIFS",
            payload: giphyUrlArray.data,
        });
    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
}

function* getFavoriteGifs(action) {

    try {
        const favoriteArray = yield axios.get("/api/favorites");
        yield put({
            type: "SET_FAVORITES",
            payload: favoriteArray.data,
        });
    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
 }

function* getCategories(action) {

    try {
        const categoryArray = yield axios.get("/api/categories");
        yield put({
            type: "SET_CATEGORIES",
            payload: categoryArray.data,
        });
    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
}

function* updateCategory(action) {


    try {
        yield axios.put(`/api/favorites/${action.payload.giphy_id}/${action.payload.category_id}`)
        yield put({
            type: "GET_FAVORITE_GIPHYS",
            getFavoriteGifs
        });
    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
}

function* setFavorite(action) {

    try {
        yield axios.post('/api/favorites', action.payload)
        yield put ({
            type: "GET_FAVORITE_GIPHYS",
            getFavoriteGifs
        })

    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
}

// implement the root saga
function* rootSaga() {
    // call generator functions to dispatch redux actions
    yield takeLatest("GET_TRENDING_GIPHYS", getTrendingGifs);

    yield takeLatest("GET_SEARCH_GIPHYS", getSearchGifs);

    yield takeLatest("GET_FAVORITE_GIPHYS", getFavoriteGifs);

    yield takeLatest("GET_CATEGORIES", getCategories);

    yield takeLatest("UPDATE_CATEGORY", updateCategory);

    yield takeLatest("MAKE_FAVORITE", setFavorite);
}

// implement saga middleware obj
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
        giphyTrendingReducer,
        giphyFavoritesReducer,
        categoryReducer
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;
