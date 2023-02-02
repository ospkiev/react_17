import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {publicRoutes, privatRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);
    if(isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
            <Switch>
                {privatRoutes.map((route) =>
                    <Route
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to="/posts"/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map((route) =>
                    <Route
                        path={route.path}
                        component={route.component}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to="/login"/>
            </Switch>
    );
};

export default AppRouter;
