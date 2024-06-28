import React from "react";
import { auth } from "../firebase";
import "./profileCard.css";
import { useDispatch } from "react-redux";
import { logout } from "../app/userSlice";

const ProfileCard = () => {
  const dispatch = useDispatch();
  return (
    <div className="profCrd">
      <div className="head">
        <h2>Logout</h2>
      </div>
      <div>
        <button onClick={() => dispatch(logout())}>Sign Out</button>
      </div>
    </div>
  );
};

export default ProfileCard;
