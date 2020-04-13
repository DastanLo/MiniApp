import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import {FormElement} from "../components";
import Button from "@material-ui/core/Button";
import {authErrorReset, loginUser} from "../store/actions/userActions";

const LoginPage = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.error);
    const [input, setInput] = useState({
        username: '',
        password: '',
    });

    const submitFormHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(input));
    };

    const inputChangeHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        return () => dispatch(authErrorReset());
    }, [dispatch]);

    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={4}>
                    <Box pt={2} pb={2}>
                        <Typography variant="h4">Login</Typography>
                    </Box>

                    <form onSubmit={submitFormHandler}>
                        <Grid container direction="column" spacing={2}>
                            {error && (
                                <Grid item xs>
                                    <Alert onClose={() => dispatch(authErrorReset())}
                                           severity="error">{error.error}</Alert>
                                </Grid>
                            )}

                            <Grid item xs>
                                <FormElement
                                    propertyName="username"
                                    title="Username"
                                    value={input.username}
                                    onChange={inputChangeHandler}
                                    type="text"
                                    autoComplete="current-username"
                                    placeholder="Enter username you registered with"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="password"
                                    title="Password"
                                    value={input.password}
                                    onChange={inputChangeHandler}
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter password"
                                />
                            </Grid>

                            <Grid item xs>
                                <Button type="submit" color="primary" variant="contained">
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;
