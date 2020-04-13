import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export function registerUser(userData) {
    return axiosInstance.post('/users', userData);
}

export function loginUser(userData) {
    return axiosInstance.post('/users/sessions', userData);
}

export function logoutUser() {
    return axiosInstance.delete('/users/sessions');
}

export function updateProfile(newUserData) {
    return axiosInstance.patch('/users/profile', newUserData);
}

export function getPosts() {
    return axiosInstance.get('/posts');
}

export function createPost(postData) {
    return axiosInstance.post('/posts', postData);
}

export function subscribeToUser(username) {
    return axiosInstance.post('/users/subscribe', username);
}
