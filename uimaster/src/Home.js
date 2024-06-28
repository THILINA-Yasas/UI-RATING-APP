import React, { useEffect, useState } from "react";
import "./Container.css";
import { useLocation, useOutletContext } from "react-router-dom";
import DesignCard from "./designCard/DesignCard";
import db from "./firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { CircularProgress } from "@mui/material";
import Topbar from "./Topbar";
import welcomeimg from "./images/GifbarImg.gif";
import Top10 from "./images/Top10.gif";

function Home() {
  const [designs, setDesigns] = useState([]);
  const [designsSearch, setDesignSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const location = useLocation();
  const handelLoadingPage = useOutletContext();

  useEffect(() => {
    const fetchTopThreeDesigns = async (maxLimit) => {
      setLoading(true);
      handelLoadingPage(true)
      setError(false);
      const designRef = collection(db, "designs");
      const q = query(designRef, orderBy("rating", "desc"), limit(maxLimit));

      await getDocs(q)
        .then((res) => {
          let data = [];
          res.forEach((design) => {
            data.push({ ...design.data(), id: design.id });
          });
          setDesigns(data);
          setDesignSearch(data);
          setLoading(false);
          handelLoadingPage(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    };

    if (location.pathname.includes("/home") || location.pathname === "/") {
      fetchTopThreeDesigns(3);
    } else if (location.pathname.includes("/ratings")) {
      fetchTopThreeDesigns(10);
    }
  }, [location]);

  const handelSearch = (searchText) => {
    const searchResult = designsSearch.filter(
      (design) =>
        design.designerName.toLowerCase().includes(searchText.toLowerCase()) ||
        design.projectName.toLowerCase().includes(searchText.toLowerCase())
    );
    setDesigns(searchResult);
  };

  return (
    <>
      <Topbar props={{ handelSearch }} />
      <div className="categories">
        <div className="categoriescon">
          <div style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                height: "30vw",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundImage: `url(${
                  location.pathname.includes("/ratings") ? Top10 : welcomeimg
                })`,
              }}
            >
              <div className="topbg">
                <div className="topbgtxt">
                  <h1 style={{ margin: "0" }}>
                    {location.pathname.includes("/ratings")
                      ? "TOP 10 RATED DESIGNS"
                      : "Welcome Back"}
                  </h1>
                  <p style={{ margin: "0" }}>
                    {location.pathname.includes("/ratings")
                      ? "Eplore Most Rated Designs"
                      : "Explore Latest UI Designs and give value for them"}
                  </p>
                </div>
              </div>
            </div>
            {/* <img
              src={}
            /> */}
          </div>
          <div className="categories0">
            <p style={{ margin: "0", fontWeight: "600" }}>
              {" "}
              {location.pathname.includes("/ratings")
                ? "Top 10 UI Desktop Designs"
                : "TOP 3 UI DESIGNS"}
            </p>
            <p style={{ fontSize: "16px", margin: "0", fontWeight: "300" }}>
              {location.pathname.includes("/ratings")
                ? "Most Rated Design Section"
                : "These are Most Rated Top 3 Designs out of all Designs"}
            </p>
          </div>
          <hr color="#d66a1c" />
          <div className="categories2">
            {loading && !error && (
              <div style={{ width: "100%", height: "7vw" }} className="loading">
                <CircularProgress />
              </div>
            )}

            {!loading && !error && designs.length === 0 && (
              <div style={{ width: "100%", height: "7vw" }} className="loading">
                <p>Not Found</p>
              </div>
            )}
            {!loading &&
              !error &&
              designs.map((design, index) => (
                <DesignCard key={index} props={design} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
