import {createBrowserRouter} from "react-router"
import Home from "../pages/Home"
import Dashboard from "../features/auth/pages/Dashboard"
import Protected from "../components/Protected"
import Scorer from "../features/resume/pages/Scorer"


//routes create

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected publicOnly={true}>
      <Home />
    </Protected>
    },
   {
        path: "/dashboard",
        element: <Protected>
            <Dashboard/>
            </Protected>
    },
    {
        path: '/scorer',
        element: <Protected>
            <Scorer/>
            </Protected>
    }
])