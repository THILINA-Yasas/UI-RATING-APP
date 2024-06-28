import React from "react";
import { Link } from "react-router-dom";

function Sidebarrow({ name, icon, url, active }) {
  return (
    <Link
      to={url}
      style={{ textDecoration: "none" }}
      className={active ? "sidebarrow sidebarrow-active" : "sidebarrow"}
    >
      <span className="sidebarrowtxt">{name}</span>
      <span className="sidebarrowicon">{icon}</span>
    </Link>
  );
}

export default Sidebarrow;
