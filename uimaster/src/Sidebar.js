import React from "react";
import Sidebarrow from "./Sidebarrow";
import HomeIcon from "@mui/icons-material/Home";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import logo from "./images/lOGO.png";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar1">
        <div className="sidebar11">
          <img src={logo} alt={logo} id="lglg" />
        </div>
        <div className="sidebar12">
          <Sidebarrow
            name="Home"
            url="home"
            icon={<HomeIcon fontSize="inherit" />}
            active={location.pathname.includes("home")}
          />
          <Sidebarrow
            name="Categories"
            url="categories"
            icon={<DashboardRoundedIcon fontSize="inherit" />}
            active={location.pathname.includes("categories")}
          />
          {/* <Sidebarrow
            name="My Activity"
            url="activity"
            icon={<HistoryOutlinedIcon fontSize="inherit" />}
            active={location.pathname.includes("activity")}
          /> */}

          <Sidebarrow
            name="Top Ratings"
            url="ratings"
            icon={<StarOutlinedIcon fontSize="inherit" />}
            active={location.pathname.includes("ratings")}
          />
          <Sidebarrow
            name="Upload Design"
            url="updesign"
            icon={<CloudUploadOutlinedIcon fontSize="inherit" />}
            active={location.pathname.includes("updesign")}
          />
        </div>
        <div className="sidebar14" style={{ color: "chocolate" }}>
          <Sidebarrow
            name="UI Standard"
            url="info"
            icon={<InfoRoundedIcon fontSize="inherit" />}
            active={location.pathname.includes("info")}
          />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
