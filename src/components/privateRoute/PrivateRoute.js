import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authModalContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
//   console.log(user.email);
  // const condition=true

  return <div>{user?.email ? <Navigate to="/" /> : <Outlet />}</div>;
};

export default PrivateRoute;
