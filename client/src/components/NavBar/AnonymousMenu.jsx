import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <Button color="inherit" component={NavLink} to="/register" exact>Sign Up</Button>
            <Button color="inherit" component={NavLink} to="/login" exact>Login</Button>
        </>
    );
};

export default AnonymousMenu;
