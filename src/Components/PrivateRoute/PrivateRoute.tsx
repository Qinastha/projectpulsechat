import React, {ReactElement, useEffect} from "react";
import {useNavigate} from "react-router-dom";

interface PrivateRouteProps {
    children: ReactElement;
}

export const PrivateRoute:React.FC<PrivateRouteProps> = ({children}) => {
    const navigate = useNavigate()
    const isAuthenticated = !!localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            navigate("/");
        }
    }, [isAuthenticated]);

    return isAuthenticated ? children : null;
}