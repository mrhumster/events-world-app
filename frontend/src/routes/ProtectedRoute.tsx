import React from "react";
import {Navigate, RouteProps} from "react-router";
import { getUser } from "../hooks";

interface ProtectedRouteProps {
    children: RouteProps["children"]
}

export function ProtectedRoute(props:ProtectedRouteProps) {
    const { children } = props
    const user = getUser();
    return user ? <>{ children }</> : <Navigate to="/login/" />;
}
