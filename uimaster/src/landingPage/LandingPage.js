import React from "react";
import "./landingPage.css";
import { useNavigate } from "react-router-dom";
import bg from "../images/uibgLand6.gif";
import UiMasterLogo from "../images/ui_master_logo.jpg"

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="backgroundLand">
        <div className="LandContent">
          <div className="Header">
            <div className="titles">

              <img src={UiMasterLogo} alt="logo"/>

              <h1>
                <span>WELCOME TO</span> UI MASTER
                <p>This is a UI/UX Design Rating Platform</p>
              </h1>

              <button onClick={() => navigate("/login")}>Next</button>
            </div>

            <img className="photoBg" src={bg} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
