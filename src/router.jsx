import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import LandingView from "./views/Landing";

const router = createBrowserRouter([

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