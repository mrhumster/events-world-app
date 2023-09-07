import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../hooks";

export function ProtectedRoute({ children }:any) {
    const user = getUser();
    return user ? <>{ children }</> : <Navigate to="/login/" />;
}
