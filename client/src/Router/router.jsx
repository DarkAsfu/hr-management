import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Components/DashboardHome/DashboardHome";
// import AllEmployee from "../Pages/AllEmployee";
// import CreateEmployee from "../Pages/CreateEmployee";
// import Validation from "../Pages/Validation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>,
        children: [
            {
                path: "/",
                element: <DashboardHome/>
            },
            // {   
            //     path: "/allemployee",
            //     element: <AllEmployee/>
            // },
            // {
            //     path: "/createEmployee",
            //     element: <CreateEmployee/>
            // },
            // {
            //     path: "/updateEmployee",
            //     element: <CreateEmployee/>
            // },
            // {
            //     path: "/employeeValidation",
            //     element: <Validation/>
            // }
        ]
    },
]);

export default router;