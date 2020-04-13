import {push} from "connected-react-router";
import {put} from "redux-saga/effects";
import {createPost, getPosts} from "../../api";
import {createPostError, getAllPostsError, getAllPostsSuccess, getPost} from "../actions/postActions";

export function* getPostsSaga() {
    try {
        const response = yield getPosts();
        yield put(getAllPostsSuccess(response.data));
    } catch (e) {
        yield put(getAllPostsError(e));
    }
}

export function* createPostSaga({postData}) {
    try {
        yield createPost(postData);
        yield put(getPost());
        yield put(push('/'));
    } catch (e) {
        yield put(createPostError(e.response.data));
    }
}
