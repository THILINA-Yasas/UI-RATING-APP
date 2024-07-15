import React from "react";
import Topbar from "../Topbar";
import CateImage4 from "../images/uibgLand3.gif";
import "./aboutUs.css";

const AboutUs = () => {
  return (
    <>
      <Topbar />
      <div className="abt">
        <div className="abt1">
          <h1>About Us</h1>
          <p>
            The "UI Master" project yielded a multifaceted outcome, successfully
            merging web application development with the implementation of a
            machine learning-powered comment prioritization system. This
            comprehensive approach has resulted in a platform that not only
            educates and empowers users but also fosters a positive and
            constructive feedback environment for UI designers.
          </p>
        </div>

        <div className="abt2">
          <img src={CateImage4} />
        </div>
      </div>
    </>
  );
};

export default AboutUs;
