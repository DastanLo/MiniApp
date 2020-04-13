import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware} from "connected-react-router";
import createSagaMiddleware from "redux-saga"
import rootReducer, {history} from "../../config/rootReducer/rootReducer";
import {axiosInstance} from "../../api";
import {loadFromLocalStorage, localStorageMiddleware} from "../../config/localStorage/localStorage";
import rootSaga from "../sagas";


const sagaMiddleware = createSagaMiddleware();

const middleware = [
    localStorageMiddleware,
    routerMiddleware(history),
    sagaMiddleware,
];


const persistedState = loadFromLocalStorage();
const store = createStore(rootReducer, persistedState,
    composeWithDevTools(applyMiddleware(...middleware))
);
axiosInstance.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = 'Token ' + store.getState().users.user.token;
    } catch (e) {
        // do nothing, user is not logged in
    }

    return config;
});

sagaMiddleware.run(rootSaga);


export default store;
