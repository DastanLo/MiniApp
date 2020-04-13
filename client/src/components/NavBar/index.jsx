import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";
import {authErrorReset, logoutUser, subscribeToUser} from "../../store/actions/userActions";
import SubscribeModal from "../Modal";
import FormElement from "../Form";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
}));

const NavBar = () => {
    const error = useSelector(state => state.users.error);
    const user = useSelector(state => state.users.user);
    const [input, setInput] = useState({username: ''});
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const classes = useStyles();

    const onClose = () => {
        setOpen(false);
        dispatch(authErrorReset());
    };
    const onOpen = () => setOpen(true);
    const subscribe = async () => {
        await dispatch(subscribeToUser(input));
        if (!error) {
            onClose();
        }
    };
    useEffect(() => {
        if (error) {
            onOpen();
        }
    }, [error]);
    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.mainLink}>Shop</Link>
                    </Typography>

                    {user ? (
                        <UserMenu onOpen={onOpen} user={user} logout={() => dispatch(logoutUser())}/>
                    ) : (
                        <AnonymousMenu/>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <SubscribeModal open={open} handleClose={onClose}>
                <Grid item xs>
                    <FormElement
                        autoComplete="off"
                        type="text"
                        propertyName="username"
                        title="Username"
                        placeholder="Enter user's Username you want to subscribe"
                        onChange={(e) => setInput({...input, username: e.target.value})}
                        value={input.username}
                    />
                </Grid>
                <Grid item xs>
                    {error &&
                    <Alert onClose={() => dispatch(authErrorReset())} severity="error">{error.message}</Alert>}
                    <Button color="primary" onClick={subscribe}>Subscribe</Button>
                </Grid>
            </SubscribeModal>
        </>
    );
};

export default NavBar;
