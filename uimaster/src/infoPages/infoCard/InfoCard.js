import React, { useState } from "react";
import "./infoCard.css";
import { SlArrowDown } from "react-icons/sl";

function InfoCard({ props }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div
      className={`infocd ${toggle ? 'expand': 'collaps'}`}
      onClick={() => setToggle(!toggle)}
      style={{
        height: toggle ? "max-content" : "12vw",
      }}
    >
      <div
        className="infocd0"
        style={{
          backgroundImage: `url(${props.imgurl})`,
          backgroundSize: "cover",
        }}
      >
        <div className="infocd01">
          <p id="infotxt">{props.categry}</p>
          <SlArrowDown
            id="infotxt"
            style={{ rotate: toggle ? "180deg" : "0deg" }}
          />
        </div>

        <div className="infocd02">
          <p id="infoPar">{props.text}</p>

          {props.urls.length > 0 && (
            <div className="infocd04">
              <p>Sources</p>
              {props.urls.map((url) => {
                return <a href={url}>{url}</a>;
              })}
            </div>
          )}

          <div className="infocd03">
            {props.imgList.map((img, index) => {
              return <img key={index} src={img} alt="small img" />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
