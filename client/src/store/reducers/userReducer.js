import {ac} from "../actions/actionTypes";

const initialState = {
    user: null,
    error: null,
};

const handlers = {
    [ac.LOGIN_USER_SUCCESS]: (state, {user}) => ({...state, user, error: null}),
    [ac.LOGIN_USER_ERROR]: (state, {error}) => ({...state, error}),
    [ac.LOG_OUT_USER]: state => ({...state, user: null}),
    [ac.REGISTER_USER_FAILURE]: (state, {error}) => ({...state, error}),
    [ac.AUTH_ERROR_RESET]: state => ({...state, error: null}),
    [ac.UPDATE_PROFILE_ERROR]: (state, {error}) => ({...state, error}),
    [ac.SUBSCRIBE_USER_ERROR]: (state, {error}) => ({...state, error}),
    [ac.SUBSCRIBE_USER_SUCCESS]: state => ({...state, error: null}),
    DEFAULT: (state) => state,
};

const userReducer = (state = initialState, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};

export default userReducer;
