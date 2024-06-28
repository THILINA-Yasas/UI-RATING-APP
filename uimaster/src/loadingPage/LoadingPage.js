import React, { useEffect } from "react";
import loadingImage from "../images/loadinganimation2.gif";
import { useLocation } from "react-router-dom";

function LoadingPage({ props }) {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.includes("categories") ||
      location.pathname.includes("updesign") ||
      location.pathname.includes("info")
    ) {
      props.handelLoadingPage(false);
    } else {
      props.handelLoadingPage(true);
    }
  }, [location]);

  return (
    <div>
      <div
        style={{
          zIndex: "10",
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundImage: `url(${loadingImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "40px",
            position: "absolute",
            top: "70vh",
            left: "45vw",
            color: "#d66a1c",
          }}
        >
          Please wait...
        </h1>
      </div>
    </div>
  );
}

export default LoadingPage;
