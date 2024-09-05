import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import LandingView from "./views/Landing";
import Register from "./views/Register";
import Login from "./views/Login";

const router = createBrowserRouter([
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/signin",
        element: <Login />
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LandingView />
            }
        ]
    }
])

export default router