import React, { useState } from "react";
import "./imageViewCard.css";

function ImageViewCard({ props }) {
  const [zoom, setZoom] = useState(false);

  const handelClick = () => {
    setZoom(!zoom);
  };

  return (
    <div onClick={zoom ? handelClick : () => {}} className={zoom ? "imageViewCard zoom" : "imageViewCard"}>
      <div
        onClick={handelClick}
        className={zoom ? "designimg designimgzoom" : "designimg"}
      >
        <img src={props.imgUrl} alt="" width="100%" height="100%" />
      </div>
    </div>
  );
}

export default ImageViewCard;
