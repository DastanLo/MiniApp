import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {FormElement} from "../components";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {authErrorReset, registerUser} from "../store/actions/userActions";
import Alert from "@material-ui/lab/Alert";

const RegisterPage = () => {
    const error = useSelector(state => state.users.error);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        username: '',
        password: '',
        display_name: '',
    });

    const submitFormHandler = (e) => {
        e.preventDefault();
        dispatch(registerUser(input));
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
                        <Typography variant="h4">Register</Typography>
                    </Box>

                    <form onSubmit={submitFormHandler}>
                        <Grid container direction="column" spacing={2}>
                            {error && (
                                <Grid item xs>
                                    <Alert onClose={() => dispatch(authErrorReset())}
                                           severity="error">{error.message}</Alert>
                                </Grid>
                            )}
                            <Grid item xs>
                                <FormElement
                                    propertyName="username"
                                    title="Username"
                                    value={input.username}
                                    onChange={inputChangeHandler}
                                    placeholder="Enter username"
                                    autoComplete="new-username"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="password"
                                    title="Password"
                                    type="password"
                                    value={input.password}
                                    onChange={inputChangeHandler}
                                    placeholder="Enter password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="display_name"
                                    title="Display Name"
                                    type="text"
                                    value={input.display_name}
                                    onChange={inputChangeHandler}
                                    placeholder="Enter display name"
                                    autoComplete="new-display_name"
                                />
                            </Grid>
                            <Grid item xs>
                                <Button type="submit" color="primary" variant="contained">
                                    Register
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default RegisterPage;
