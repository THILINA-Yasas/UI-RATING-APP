import React, { useEffect } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import designImg from "./images/design.png";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Ratings from "./ratingComponent/Ratings";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "./firebase";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "./app/userSlice";
import Comments from "./comments/Comments";
import ImageViewCard from "./imageViewCard/ImageViewCard";

function Designs() {
  const user = useSelector(selectUser);
  const [conmenu, setConmenu] = useState(false);
  const location = useLocation();

  const [design, setDesign] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [previousComment, setPreviousComment] = useState(true);
  const [loadingComment, setLoadingComment] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getDesign = async () => {
      setLoading(true);
      const docRef = doc(db, "designs", id);

      await getDoc(docRef)
        .then((res) => {
          setDesign(res.data());
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setError(true);
        });
    };

    const getPreviousComment = async () => {
      setLoadingComment(true);
      const docRef = collection(db, "comments");

      const q = query(
        docRef,
        where("designId", "==", id),
        where("uid", "==", user.uid)
      );

      await getDocs(q)
        .then((res) => {
          if (res.empty) {
            setPreviousComment(false);
          } else {
            setPreviousComment(true);
          }
          setLoadingComment(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (!conmenu) {
      getDesign();
      getPreviousComment();
    }
  }, [id, conmenu]);

  const showmenu = () => {
    setConmenu(true);
  };
  const hidemenu = () => {
    setConmenu(false);
  };
  return (
    <div className="designs">
      {loading && !error && (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="designtop">
            <div className="designtop1">
              <img
                src={design.designUrl[0] || designImg}
                alt=""
                height="100%"
                width="100%"
              />
            </div>
            <div className="designtop2">
              <div className="designtop21">{design.projectName}</div>
              <div className="designtop22">{design.tags.join(", ")}</div>
              <div className="designtop23">
                <Rating
                  initialValue={design.rating}
                  readonly={true}
                  allowFraction={true}
                  size={25}
                />
              </div>
            </div>
            <div className="designtop3">
              <div
                style={{
                  cursor:
                    previousComment || loadingComment ? "none" : "pointer",
                  transform: previousComment || loadingComment ? "none" : "",
                  opacity: previousComment || loadingComment ? "60%" : "",
                }}
                className="designtop31"
                onClick={
                  previousComment || loadingComment ? () => {} : showmenu
                }
              >
                {loadingComment ? "loading..." : "Give Rate now"}
              </div>
            </div>
          </div>
          <div className="designbot1">
            <div
              className="prfcontract"
              style={{ display: conmenu ? "block" : "none" }}
            >
              <Ratings props={{ design, hidemenu }} />
            </div>

            {Object.keys(design.TotalRatings).map((val, index) => {
              let score =
                Math.round(
                  (design.TotalRatings[val] / design.ratingCount) * 10
                ) / 10;
              return (
                <div key={index} className="designrate">
                  {val.split("_").join(" ")}
                  <StarOutlinedIcon
                    fontSize="inherit"
                    style={{ color: "#484747", fontSize: "1.5vw" }}
                  />
                  {score || 0}
                </div>
              );
            })}
          </div>

          <div className="designbot2">
            {design.designUrl.map((imgUrl, index) => {
              return <ImageViewCard key={index} props={{ imgUrl: imgUrl }} />;
            })}
          </div>
          <Comments />
          <div className="designbot4"></div>
        </>
      )}
    </div>
  );
}

export default Designs;
