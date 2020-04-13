import React from 'react';
import {NavBar} from "./components";
import {useRoutes} from "./config/routes/routes";
import {useSelector} from "react-redux";
import Container from "@material-ui/core/Container";


function App() {
    const isAuth = useSelector(state => state.users.user);
    const routes = useRoutes(isAuth);
    return (
        <Container maxWidth="lg">
            <NavBar/>
            {routes}
        </Container>
    );
}

export default App;
