import React, { useState } from "react";
import "./designCard.css";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const DesignCard = ({ props }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="homecard" style={{ height: isOpen ? "" : "33vw" }}>
      <div
        onClick={() => navigate(`/designs/${props.id}`, { state: props })}
        className="homecard1"
      >
        <div className="homecardimg">
          <img src={props.designUrl[0]} alt="" height="100%" width="100%" />
        </div>
        <div className="hometxt1">{props.projectName}</div>
        <div className="hometxt2">Design by - {props.designerName}</div>
        <div className="homestar">
          <div className="homestar2">
            <Rating
              initialValue={props.rating}
              readonly={true}
              allowFraction={true}
              size={30}
            />
          </div>
        </div>
      </div>

      <div className="homecardend">
        <div className="homescore">{Math.round(props.rating * 10) / 10}</div>
        <div onClick={() => setIsOpen(!isOpen)} className="homemoree">
          <span id="hometxt3">{isOpen ? "Minimize" : "View More"}</span>
          <hr color="#d66a1c" />
        </div>
      </div>

      <div className="homemoree1">
        {Object.keys(props.TotalRatings).map((val, index) => {
          let score =
            Math.round((props.TotalRatings[val] / props.ratingCount) * 10) / 10;
          return (
            <div key={index} className="homemoree11">
              <p>{val.split("_").join(" ")}</p>
              <Rating
                className="homemoree12"
                readonly={true}
                initialValue={score || 0}
                allowFraction={true}
                size={23}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DesignCard;
