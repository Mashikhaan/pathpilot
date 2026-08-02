import {createBrowserRouter} from "react-router"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import Home from "../pages/Home"
import Dashboard from "../features/auth/pages/Dashboard"
//routes create

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },{
        path: "/dashboard",
        element: <Dashboard/>
    }
])