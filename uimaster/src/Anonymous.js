import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectUser } from "./app/userSlice";
import { useSelector } from "react-redux";

const Anonymous = () => {
  const user = useSelector(selectUser);
  const location = useLocation()

  return user ? (
    <Navigate to={"/home"} />
  ) : (
    <div className="App">
      {(location.pathname === "/auth" || location.pathname === "/auth/")  && <Navigate to={"/auth/login"}/>}
      <Outlet />
    </div>
  );
};

export default Anonymous;
