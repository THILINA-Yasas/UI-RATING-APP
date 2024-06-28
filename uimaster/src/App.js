import "./App.css";
import LogIn from "./LogIn";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { login, logout, selectUser } from "./app/userSlice";
import db, { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Designs from "./Designs";
import Authenticated from "./Authenticated";
import Anonymous from "./Anonymous";
import Signup from "./Signup";
import LandingPage from "./landingPage/LandingPage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [role, setRole] = useState([]);
  const [name, setName] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Anonymous />}>
          <Route path="login" element={<LogIn />} />
          <Route path="register" element={<Signup />} />
        </Route>
        <Route path="/" element={<Authenticated />}>
          <Route path="home" element={<Main page="home" />} />
          <Route path="categories" element={<Main page="categories" />} />
          <Route path="updesign" element={<Main page="Updesign" />} />
          <Route path="activity" element={<Main page="activity" />} />
          <Route path="designs/:id" element={<Designs />} />
          <Route path="info" element={<Main page="Info" />} />
          <Route path="ratings" element={<Main page="home" />} />
        </Route>
        <Route path="*" element={<Navigate to={"/home"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
