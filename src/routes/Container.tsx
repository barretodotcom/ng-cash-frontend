import { useRoutes } from "react-router-dom";

import React from 'react'
import Login from "../pages/Login/Login";
import { MessageInfo } from "../components/MessageInfo/MessageInfo";
import CreateAccount from "../pages/CreateAccount/CreateAccount";
import Header from "../components/Header/Header";
import MainPage from "../pages/MainPage/MainPage";

function Container() {

    const loginRoute = {
        element: <Login />,
        path: "/login"
    }

    const createAccountRoute = {
        element: <CreateAccount />,
        path: "/criar-conta"
    }

    const mainPageRoute = {
        element: <MainPage />,
        path: "/you"
    }

    const routes = useRoutes([
        loginRoute,
        createAccountRoute,
        mainPageRoute
    ])

    return (
        <div>
            <Header />
            {routes}
            <MessageInfo />
        </div>
    )
}

export default Container