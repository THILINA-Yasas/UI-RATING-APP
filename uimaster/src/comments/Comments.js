import React, { useEffect, useState } from "react";
import db from "../firebase";
import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUser } from "../app/userSlice";
import { CircularProgress } from "@mui/material";
import "./comments.css";
import CommentCard from "./commentCard/CommentCard";

function Comments() {
  const user = useSelector(selectUser);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      const commentRef = collection(db, "comments");
      const q = query(
        commentRef,
        and(
          where("designId", "==", id),
          or(where("sentiment", "==", "Positive"), where("uid", "==", user.uid))
        )
      );

      await getDocs(q)
        .then((res) => {
          let data = [];
          res.forEach((commnets) => {
            data.push(commnets.data());
          });

          console.log(data);
          setComments(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    };

    fetchComments();
  }, [id]);

  return (
    <div className="designbot3">
      <span
        style={{
          color: "white",
          fontSize: "0.9vw",
          fontFamily: "Poppins",
        }}
      >
        Comments
      </span>
      <div className="designcomments">
        {loading && !error && (
          <div className="designcomments_loading">
            <CircularProgress />
          </div>
        )}

        {!loading && !error && comments.length === 0 && (
          <div className="designcomments_loading">
            <p style={{ fontSize: "20px", fontStyle: "italic" }}>No comment</p>
          </div>
        )}

        {comments.map((comment, index) => {
          return <CommentCard key={index} props={comment} />;
        })}
      </div>
    </div>
  );
}

export default Comments;
