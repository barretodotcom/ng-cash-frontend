import { useRoutes } from "react-router-dom";

import React from 'react'
import Login from "../Pages/Login/Login";
import { MessageInfo } from "../components/MessageInfo/MessageInfo";

function Container() {

    const loginRoute = {
        element: <Login />,
        path: "/login"
    }

    const routes = useRoutes([
        loginRoute,
    ])

    return (
        <div>
            {routes}
            <MessageInfo />
        </div>
    )
}

export default Container