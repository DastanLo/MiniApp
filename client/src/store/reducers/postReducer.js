import {ac} from "../actions/actionTypes";

const initialState = {
    error: null,
    posts: [],
};

const handlers = {
    [ac.LOAD_POST_SUCCESS]: (state, {posts}) => ({...state, posts}),
    [ac.LOAD_POST_ERROR]: (state, {error}) => ({...state, error}),
    [ac.CREATE_POST_ERROR]: (state, {error}) => ({...state, error}),
    [ac.RESET_POST_ERROR]: state => ({...state, error: null}),
    DEFAULT: (state) => state,
};

const postReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};

export default postReducer;
