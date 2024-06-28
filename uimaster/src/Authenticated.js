import React, { useState } from "react";
import "./App.css";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { selectUser } from "./app/userSlice";
import { useSelector } from "react-redux";
import LoadingPage from "./loadingPage/LoadingPage";


function Authenticated() {
  const user = useSelector(selectUser);
  const location = useLocation();
  const [loadingPage, setLoadingPage] = useState(true);

  const handelLoadingPage = (value) => {
    setLoadingPage(value);
  };

  return !user ? (
    <Navigate to={"/auth"} />
  ) : (
    <div className="App">
      {location.pathname === "/" && <Navigate to={"/home"} />}
        <>
        {loadingPage && <LoadingPage props={{handelLoadingPage}} />}
          <Sidebar />
          <Outlet context={handelLoadingPage} />
        </>
    </div>
  );
}

export default Authenticated;
