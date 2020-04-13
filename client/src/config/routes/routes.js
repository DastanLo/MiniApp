import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Posts from "../../containers/Posts";
import RegisterPage from "../../containers/RegisterPage";
import LoginPage from "../../containers/LoginPage";
import AddPostPage from "../../containers/AddPostPage";
import ProfilePage from "../../containers/ProfilePage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/" exact component={Posts}/>
                <Route path="/addPost" exact component={AddPostPage}/>
                <Route path="/profile" exact component={ProfilePage}/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact component={RegisterPage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Redirect to="/"/>
        </Switch>
    )
};
