import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRouter = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <>
            <div className="flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-blue-600 rounded-full animate-spin"></div>
            </div></>
    }
    if(user){
        return children;
    }
    return <Navigate to='/signin' state={{from: location}} replace></Navigate>
};

export default PrivateRouter;