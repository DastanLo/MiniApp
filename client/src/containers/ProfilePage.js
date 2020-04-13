import React, {useState} from 'react';
import {FormElement} from "../components";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {authErrorReset, updateProfile} from "../store/actions/userActions";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const error = useSelector(state => state.users.error);
    const [state, setState] = useState({
        avatar: null,
        display_name: user.display_name || '',
    });

    const onSubmit = e => {
        e.preventDefault();

        const profileData = new FormData();

        Object.keys(state).forEach(key => {
            profileData.append(key, state[key]);
        });

        dispatch(updateProfile(profileData));
    };

    const onChange = e => {
        setState({...state, [e.target.name]: e.target.value});
    };

    const onFileChange = e => {
        setState({...state, [e.target.name]: e.target.files[0]});
    };

    return (
        <Container maxWidth="sm">
            <h3>Change user data</h3>
            <form onSubmit={onSubmit}>
                <Grid container direction="column" spacing={2}>
                    {error && <Grid item xs>
                        <Alert severity="error" onClose={() => dispatch(authErrorReset())}>{error}</Alert>
                    </Grid>}
                    <Grid item xs>
                        <FormElement
                            type="text"
                            propertyName="display_name" required
                            title="Display Name"
                            onChange={onChange}
                            value={state.display_name}
                        />
                    </Grid>
                    <Grid item xs>
                        {
                            user.avatar ? <img style={{width: 200, height: 150}}
                                               src={process.env.REACT_APP_API_URL + '/' + user.avatar} alt="avatar"/>
                                : "No avatar"
                        }
                    </Grid>
                    <Grid item xs>
                        <FormElement
                            type="file"
                            propertyName="avatar"
                            title="Avatar"
                            onChange={onFileChange}
                        />
                    </Grid>
                    <Grid item xs>
                        <Button type="submit" color="primary" variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ProfilePage;
