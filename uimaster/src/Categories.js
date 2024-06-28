import React, { useEffect, useRef, useState } from "react";
import Categorycard from "./Categorycard";
import CateImage5 from "./images/uibganimared2.webp";
import CateImage1 from "./images/anim1.gif";
import CateImage4 from "./images/uibgLand3.gif";
import CateImage2 from "./images/uibgLand4.gif";
import CateImage3 from "./images/uibgland5.gif";
import CateImage6 from "./images/uibganimatedmobile.gif";
import CateImage7 from "./images/UIbgfive.png";
import CateImage8 from "./images/UIbgfour.png";
import CateImageA from "./images/uianimatedAllA.gif";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import db from "./firebase";
import DesignCard from "./designCard/DesignCard";
import { CircularProgress } from "@mui/material";
import Topbar from "./Topbar";
import { useOutletContext } from "react-router-dom";

function Categories() {
  const [selectedCat, setSelectedCat] = useState("All Designs");
  const [designs, setDesigns] = useState([]);
  const [designsSearch, setDesignSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef(null);
  

  const catCardList = [
    { categry: "All Designs", image: CateImageA },
    { categry: "Graphical UI", image: CateImage1 },
    { categry: "Commercial", image: CateImage2 },
    { categry: "Landing Page UI", image: CateImage3 },
    { categry: "Classic UI", image: CateImage4 },
    { categry: "Gesture-Based UI", image: CateImage5 },
    { categry: "Touch Screen UI", image: CateImage6 },
    { categry: "Mordern", image: CateImage7 },
    { categry: "Menu - Driven UI", image: CateImage8 },
    { categry: "System-based", image: CateImage5 },
  ];

  useEffect(() => {
    const fetchDesigns = async () => {
      const designRef = collection(db, "designs");
      const q = query(
        designRef,
        where("tags", "array-contains", selectedCat),
        orderBy("rating", "desc")
      );

      await getDocs(q)
        .then((res) => {
          let data = [];
          res.forEach((design) => {
            data.push({ ...design.data(), id: design.id });
          });
          setDesigns(data);
          setDesignSearch(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    };

    const fetchAllDesigns = async () => {
      const designRef = collection(db, "designs");
      const q = query(designRef, orderBy("rating", "desc"));

      await getDocs(q)
        .then((res) => {
          let data = [];
          res.forEach((design) => {
            data.push({ ...design.data(), id: design.id });
          });
          setDesigns(data);
          setDesignSearch(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    };

    setLoading(true);
    setError(false);
    if (selectedCat === "All Designs") fetchAllDesigns();
    else fetchDesigns();
  }, [selectedCat]);

  const handelChange = (categry) => {
    setSelectedCat(categry);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

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
          <h1 className="categories0">Categories</h1>
          <hr color="#d66a1c" />
          <div className="categories00">
            <div className="categories0">
              Design Features
              <p style={{ fontSize: "16px", margin: "0" }}>
                Discovering designs in your chosen category
              </p>
            </div>
            <div ref={scrollRef} className="categories1">
              {catCardList.map((val, index) => {
                return (
                  <Categorycard
                    imgurl={val.image}
                    handelChange={handelChange}
                    value={selectedCat}
                    categry={val.categry}
                  />
                );
              })}
            </div>
          </div>
          <div className="categories01">
            <div className="categories0">All Designs</div>
            <div className="categories2">
              {loading && !error && (
                <div
                  style={{ width: "100%", height: "7vw" }}
                  className="loading"
                >
                  <CircularProgress />
                </div>
              )}

              {!loading && !error && designs.length === 0 && (
                <div
                  style={{ width: "100%", height: "7vw" }}
                  className="loading"
                >
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
      </div>
    </>
  );
}

export default Categories;
