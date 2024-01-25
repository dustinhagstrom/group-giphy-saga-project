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
function* setTrendingGifs(action) {
    const arrayOfUrls = [];
    console.log("action in setTrendingGifs, sent from saga:", action);

    try {
        const giphyUrlArray = yield axios.get("/api/trending");
        yield put({
            type: "SET_GIFS",
            payload: giphyUrlArray.data,
        });
    } catch (err) {
        console.log("we got ourselves an error up in this house.");
        console.error(err);
    }
}

function* setSearchGifs(action){
    console.log('action in setSearchGifs sent from Saga', action);

    // try{
    //     const giphyUrlArray = 
    // }
}

// implement the root saga
function* rootSaga() {
    // call generator functions to dispatch redux actions
    yield takeLatest("GET_TRENDING_GIPHYS", setTrendingGifs);
    
    yield takeLatest("GET_SEARCH_GIPHYS", setSearchGifs);
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
