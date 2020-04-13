import {ac} from "./actionTypes";

//============= ДЕЙСТВИЯ С ПОСТАМИ =====================

export const createPost = postData => ({type: ac.CREATE_POST, postData});
export const createPostError = error => ({type: ac.CREATE_POST_ERROR, error});

export const getPost = () => ({type: ac.LOAD_POST});
export const getAllPostsSuccess = posts => ({type: ac.LOAD_POST_SUCCESS, posts});
export const getAllPostsError = error => ({type: ac.LOAD_POST_ERROR, error});

export const resetPostError = () => ({type: ac.RESET_POST_ERROR});
