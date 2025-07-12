import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authUser = useSelector((store) => store.user);

  if (!authUser) {
    console.log("User is not logged-in, redirecting to login page");
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
