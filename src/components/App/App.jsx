import Search from "../Search/Search";
import GiphyList from "../GiphyList/GiphyList";
import { Provider } from "react-redux";

import store from "../redux/store";

function App() {
    return (
        <Provider store={store}>
            <div>
                {/* <h1>Giphy Search!</h1> */}
                <Search />
                <GiphyList />
            </div>
        </Provider>
    );
}

export default App;
