import Search from "../Search/Search";
import GiphyList from "../GiphyList/GiphyList";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";

import store from "../redux/store";
import GiphyFavList from "../GiphyFavList/GiphyFavList";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path={"/"} exact>
                        <Search />
                        <GiphyList />
                    </Route>
                    <Route path={"/favorites"}>
                        <GiphyFavList />
                    </Route>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
