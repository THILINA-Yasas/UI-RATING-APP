import React from "react";
import aa from "./images/5.png";

function Categorycard({ categry, value, handelChange, imgurl }) {
  return (
    <div
      onClick={() => handelChange(categry)}
      style={{ border: value === categry && "#e88d4c solid 0.25vw" }}
      className="ctgcd"
    >
      <div
        className="ctgcd0"
        style={{
          backgroundImage: `url(${imgurl || aa})`,
          backgroundSize: "cover",
        }}
      >
        <div className="ctgcd01">
          <span id="categrytxt">{categry}</span>
        </div>
      </div>
    </div>
  );
}

export default Categorycard;
