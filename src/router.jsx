import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import LandingView from "./views/Landing";
import Register from "./views/Register";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import TransactionsView from "./views/Transactions";
import RequireAuth from "./components/RequiredAuth";

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
            },
            {
                path: "/dashboard",
                element: <RequireAuth>
                    <Dashboard />
                </RequireAuth>
            },
            {
                path: "/transactions",
                element: <RequireAuth>
                    <TransactionsView />
                </RequireAuth>
            },
        ]
    }
])

export default router