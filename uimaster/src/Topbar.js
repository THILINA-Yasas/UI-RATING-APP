import React, { useEffect, useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import ProfileCard from "./profileCard/ProfileCard";
import { selectUser } from "./app/userSlice";
import { useSelector } from "react-redux";

function Topbar({ props }) {
  const user = useSelector(selectUser);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (props) props.handelSearch(searchText);
  }, [searchText]);

  return (
    <div className="TopSection">
      <div className="topbar">
        <div className="searchhere">
          <div className="searchheretxt">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              type="text"
              placeholder="Search"
            />
            <div className="SearchSection">
              <div className="searchicon">
                {searchText ? (
                  <CancelIcon
                    onClick={() => {
                      setSearchText("");
                    }}
                    fontSize="inherit"
                  />
                ) : (
                  <SearchRoundedIcon fontSize="inherit" />
                )}
              </div>
            </div>
          </div>
        </div>
        <span id="jst1">
          <Link
            to="/home"
            className="topbartxt"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="topbartxt"
            style={{ textDecoration: "none" }}
          >
            All Designs
          </Link>

          {/* <Link
          to="/activity"
          className="topbartxt"
          style={{ textDecoration: "none" }}
        >
          Activity
        </Link> */}
        </span>
        <div className="topbaravtr">
          <div className="topbaravtr_user">
            <p className="topbaravtr_user-p1">{user.name || "User Name"}</p>
            <p className="topbaravtr_user-p1">{user.email}</p>
          </div>

          <AccountCircleRoundedIcon
            fontSize="large"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {isOpen && <ProfileCard />}
      </div>
    </div>
  );
}

export default Topbar;
