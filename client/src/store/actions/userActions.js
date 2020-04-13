import {ac} from "./actionTypes";


//=============РЕГИСТРАЦИЯ И ЛОГИН===========

export const authErrorReset = () => ({type: ac.AUTH_ERROR_RESET});

export const registerUserSuccess = () => ({type: ac.REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: ac.REGISTER_USER_FAILURE, error});
export const registerUser = userData => ({type: ac.REGISTER_USER, userData});

export const loginUserSuccess = user => ({type: ac.LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: ac.LOGIN_USER_ERROR, error});
export const loginUser = userData => ({type: ac.LOGIN_USER, userData});
export const logoutUser = () => ({type: ac.LOG_OUT_USER});

//===============ДЕЙСТВИЯ С РЕДАКТИРОВАНИЕМ ПРОФИЛЯ==============

export const updateProfile = newUserData => ({type: ac.UPDATE_PROFILE, newUserData});
export const updateProfileSuccess = user => ({type: ac.LOGIN_USER_SUCCESS, user});
export const updateProfileError = error => ({type: ac.UPDATE_PROFILE_ERROR, error});

//=================ПОДПИСКА НА ПОЛЬЗОВАТЕЛЯ===============

export const subscribeToUser = username => ({type: ac.SUBSCRIBE_USER, username});
export const subscribeToUserSuccess = () => ({type: ac.SUBSCRIBE_USER_SUCCESS});
export const subscribeToUserError = error => ({type: ac.SUBSCRIBE_USER_ERROR, error});
