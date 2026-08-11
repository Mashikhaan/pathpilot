import {createBrowserRouter} from "react-router"
import Home from "../pages/Home"
import Dashboard from "../features/auth/pages/Dashboard"
import Protected from "../components/Protected"
import Scorer from "../features/resume/pages/Scorer"
import ResumeBuilder from "../features/resume/pages/ResumeBuilder"


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
    },
    {
        path: '/resume',
        element: <Protected>
            <ResumeBuilder/>
            </Protected>
    }
   
])