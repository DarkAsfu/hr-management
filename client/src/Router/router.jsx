import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Components/DashboardHome/DashboardHome";
import AllEmployee from "../Pages/AllEmployee";
import SingleEmployee from "../Pages/SingleEmployee";
import CreateEmployee from "../Pages/CreateEmployee";
import Signin from "../Components/Signin/Signin";
import Signup from "../Components/Signup/Signup";
import PrivateRouter from "./PrivateRouter";
import UpdateEmployee from "../Pages/UpdateEmployee";
import Attendance from "../Pages/Attendance";
import Profile from "../Components/Profile/Profile";
import DepartmentWiseEmployee from "../Pages/DepartmentWiseEmployee";
// import Validation from "../Pages/Validation";

const router = createBrowserRouter([
    {
        path: "/",
        element:<Dashboard/>,
        children: [
            {
                path: "/",
                element: <PrivateRouter><DashboardHome/></PrivateRouter>
            },
            {   
                path: "/allemployee",
                element: <PrivateRouter><AllEmployee/></PrivateRouter>
            },
            {
                path: "/employee/:id",
                element: <SingleEmployee/>,
                loader: ({params}) => fetch(`http://localhost:5000/employees/${params.id}`)
            },
            {
                path: "/createEmployee",
                element: <PrivateRouter><CreateEmployee/></PrivateRouter>
            },
            {
                path: "/updateEmployee/:id",
                element: <UpdateEmployee/>
            },
            {
                path: "/attendance",
                element: <PrivateRouter><Attendance/></PrivateRouter>
            },
            {
                path: "/departmentWiseEmployee",
                element: <DepartmentWiseEmployee/>
            },
            {
                path: "/profile",
                element: <PrivateRouter><Profile/></PrivateRouter>
            },
            {
                path: '/signin',
                element: <Signin/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    },
    
]);

export default router;