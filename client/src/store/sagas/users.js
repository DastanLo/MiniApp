import {put} from "redux-saga/effects";
import {push} from "connected-react-router";
import {
    loginUserFailure,
    loginUserSuccess,
    registerUserFailure,
    registerUserSuccess, subscribeToUserError, subscribeToUserSuccess,
    updateProfileError,
    updateProfileSuccess
} from "../actions/userActions";

import {loginUser, logoutUser, registerUser, subscribeToUser, updateProfile} from "../../api";
import {getPost} from "../actions/postActions";

export function* registerUserSaga({userData}) {
    try {
        yield registerUser(userData);
        yield put(registerUserSuccess());
        yield put(push('/login'));
    } catch (e) {
        yield put(registerUserFailure(e.response.data));
    }
}

export function* loginUserSaga({userData}) {
    try {
        const response = yield loginUser(userData);
        yield put(loginUserSuccess(response.data));
        yield put(push('/'));
    } catch (e) {
        yield put(loginUserFailure(e.response.data));
    }
}

export function* logoutUserSaga() {
    try {
        yield logoutUser();
        yield put(push('/'));
    } catch (e) {
        console.log(e);
    }
}

export function* updateProfileSaga({newUserData}) {
    try {
        const response = yield updateProfile(newUserData);
        yield put(updateProfileSuccess(response.data));
    } catch (e) {
        yield put(updateProfileError(e.response.data));
    }
}

export function* subscribeToUserSaga({username}) {
    try {
        yield subscribeToUser(username);
        yield put(subscribeToUserSuccess());
        yield put(getPost());
        yield put(push('/'));
    } catch (e) {
        yield put(subscribeToUserError(e.response.data));
    }
}


