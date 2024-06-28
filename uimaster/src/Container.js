import React from "react";
import Home from "./Home";
import Categories from "./Categories";

import Activity from "./Activity";
import Updesign from "./Updesign";
import Info from "./infoPages/info/Info";

function Container({ page, name }) {
  if (page === "home") {
    return (
      <div className="container">
        <Home />
      </div>
    );
  } else if (page === "categories") {
    return (
      <div className="container">
        <Categories />
      </div>
    );
  } else if (page === "activity") {
    return (
      <div className="container">
        <Activity />
      </div>
    );
  } else if (page === "Updesign") {
    return (
      <div className="container">
        <Updesign name={name} />
      </div>
    );
  } else if (page === "Info") {
    return (
      <div className="container">
        <Info />
      </div>
    );
  }
}

export default Container;
