import {takeEvery, all} from "redux-saga/effects";
import {loginUserSaga, logoutUserSaga, registerUserSaga, subscribeToUserSaga, updateProfileSaga} from "./users";
import {ac} from "../actions/actionTypes";
import {createPostSaga, getPostsSaga} from "./posts";


export function* watchRegisterUser() {
    yield takeEvery(ac.REGISTER_USER, registerUserSaga);
}

export function* watchLoginUser() {
    yield takeEvery(ac.LOGIN_USER, loginUserSaga);
}

export function* watchLogoutUser() {
    yield takeEvery(ac.LOG_OUT_USER, logoutUserSaga);
}

export function* watchUpdateProfile() {
    yield takeEvery(ac.UPDATE_PROFILE, updateProfileSaga);
}

export function* watchGetPosts() {
    yield takeEvery(ac.LOAD_POST, getPostsSaga);
}

export function* watchCreatePost() {
    yield takeEvery(ac.CREATE_POST, createPostSaga);
}

export function* watchSubscribeToUser() {
    yield takeEvery(ac.SUBSCRIBE_USER, subscribeToUserSaga);
}

export default function* rootSaga() {
    yield all([
        watchRegisterUser(),
        watchLoginUser(),
        watchLogoutUser(),
        watchUpdateProfile(),
        watchGetPosts(),
        watchCreatePost(),
        watchSubscribeToUser(),
    ])
}
