import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

const giphyGeneralPurposeReducer = (state = [], action) => {
    // add some action.type === something;
    if (action.type === "SET_GIFS") {
        return action.payload;
    }
    return state;
};

// const giphyFavoritesReducer = () => {

// }

//! Generator functions below
function* getTrendingGifs(action) {
    const arrayOfUrls = [];
    // console.log("action in setTrendingGifs, sent from saga:", action);

    try {
        const giphyUrlArray = yield axios.get("/api/giphy");
        console.log("giphy array:", giphyUrlArray);
        yield put({
            type: "SET_GIFS",
            payload: giphyUrlArray.data,
        });
    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
}

function* getSearchGifs(action){
    console.log('action in setSearchGifs sent from Saga', action);

    try{
        const giphyUrlArray = yield axios.post("/api/giphy", action.payload);
        console.log("giphyUrlArray in getSearchGifs:", giphyUrlArray);
        yield put({
            type: "SET_GIFS",
            payload: giphyUrlArray.data,
        });
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
}

// implement saga middleware obj
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
        giphyGeneralPurposeReducer,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;
