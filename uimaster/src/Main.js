import React from "react";
import Topbar from "./Topbar";
import Container from "./Container";

function Main({ page, name }) {
  return (
    <div className="main">
      {/* <Topbar /> */}
      <Container page={page} name={name} />
    </div>
  );
}

export default Main;
