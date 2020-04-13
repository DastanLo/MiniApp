import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import userReducer from "../../store/reducers/userReducer";
import postReducer from "../../store/reducers/postReducer";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    users: userReducer,
    post: postReducer,
    router: connectRouter(history),
});

export default rootReducer;
