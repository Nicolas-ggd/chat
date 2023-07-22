import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    const userAccesToken = localStorage.getItem('access_token');

    return (
        userAccesToken ? <Outlet /> : <Navigate to="/" />
    );
};