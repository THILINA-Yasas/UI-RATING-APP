import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./Sidebar";
import Main from "./Main";

function Content() {
  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/home" element={<Main page="home" />} />
        <Route path="/categories" element={<Main page="categories" />} />
        <Route path="/shop" element={<Main page="shop" />} />
        <Route path="/activity" element={<Main page="activity" />} />
      </Routes>
    </div>
  );
}

export default Content;
