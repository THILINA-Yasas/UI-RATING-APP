import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useParams } from "react-router-dom";
import db from "../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";

function Ratings({ props }) {
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratingData, setRatingData] = useState({
    Colour_Pallets: 0,
    Consistence: 0,
    Contrast: 0,
    Look_and_Feel: 0,
    Typoghraphy: 0,
  });
  const ratingList = [
    "Colour_Pallets",
    "Consistence",
    "Contrast",
    "Look_and_Feel",
    "Typoghraphy",
  ];

  const BASE_URL = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const handelRatingChange = (key, rate) => {
    setRatingData({ ...ratingData, [key]: rate });
  };

  const handelSubmit = async () => {
    setLoading(true);
    if (ratingList.every((val) => ratingData[val] !== 0) && formData !== "") {
      const sentiment = await getSentimental();

      const ratings = calRatings();

      if (sentiment) {
        await updateRatings(ratings);

        await setComment({ comment: formData, sentiment: sentiment });

        resetForm();
      }
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData("");
    setRatingData({
      Colour_Pallets: 0,
      Consistence: 0,
      Contrast: 0,
      Look_and_Feel: 0,
      Typoghraphy: 0,
    });

    props.hidemenu();
  };

  const getSentimental = async () => {
    return await axios
      .post(
        `${BASE_URL}/sentiment`,
        {},
        {
          params: {
            comment: formData,
          },
        }
      )
      .then((res) => {
        return res.data.sentiment;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateRatings = async (ratings) => {
    const ratingRef = doc(db, "designs", id);

    await updateDoc(ratingRef, {
      ...ratings,
    })
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const setComment = async (comment) => {
    const commentCol = collection(db, "comments");

    await addDoc(commentCol, {
      ...comment,
      designId: id,
      uid: user.uid,
      userEmail: user.email,
    })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const calRatings = () => {
    const ratingCount = props.design.ratingCount + 1;
    let rating = 0;
    let totalRatings = {};

    Object.keys(ratingData).map((val) => {
      const newRating = ratingData[val] + props.design.TotalRatings[val];
      totalRatings = { ...totalRatings, [val]: newRating };

      rating += newRating;
    });

    rating = rating / ratingCount / Object.keys(ratingData).length;

    return {
      TotalRatings: totalRatings,
      rating: rating,
      ratingCount: ratingCount,
    };
  };

  return (
    <>
      <div className="designratebx1">
        <span style={{ marginLeft: "1vw", fontSize: "1vw" }}>
          Select Stars for your rating Level
        </span>
      </div>
      <div className="designratebx2">
        {ratingList.map((val, index) => {
          return (
            <div key={index} className="designratebx21">
              <InfoOutlinedIcon
                fontSize="inherit"
                style={{ width: "10%", color: "#db6712" }}
              />
              <div className="designratebx212">{val.split("_").join(" ")}</div>
              <div className="designratebx211">
                <Rating
                  onClick={(rate) => handelRatingChange(val, rate)}
                  initialValue={ratingData[val]}
                  size={25}
                />
              </div>
            </div>
          );
        })}

        <div className="designratebx22">
          <input
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            type="text"
            placeholder="Add Comment"
            className="designratebxcmnt"
          />
        </div>
        <div className="designratebx23">
          <div  onClick={handelSubmit} className="designratebx231">
            {loading ? "Submiting...": "Submit"}
          </div>
          <div
            className="designratebx231"
            style={{ backgroundColor: "white", color: "black" }}
            onClick={props.hidemenu}
          >
            Cancel
          </div>
        </div>
      </div>
    </>
  );
}

export default Ratings;
