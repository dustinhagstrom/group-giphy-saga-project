import Search from "../Search/Search";
import GiphyList from "../GiphyList/GiphyList";
import CategoryList from "../CategoryList/CategoryList";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

import store from "../redux/store";
import GiphyFavList from "../GiphyFavList/GiphyFavList";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    {/* <h1>Giphy Search!</h1> */}
                    <Route path={"/"} exact>
                        <Search />
                        <GiphyList />
                    </Route>
                    <Route path={"/favorites"}>
                        <CategoryList />
                        <GiphyFavList />
                    </Route>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
