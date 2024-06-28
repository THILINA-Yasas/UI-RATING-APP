import React, { useEffect, useRef } from "react";
import db, { imageDb } from "./firebase";
import { SlArrowDown } from "react-icons/sl";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectUser } from "./app/userSlice";
import Topbar from "./Topbar";

function Updesign({ name }) {
  const user = useSelector(selectUser);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState([]);
  const imgRef1 = useRef(null);
  const imgRef2 = useRef(null);
  const imgRef3 = useRef(null);

  const [formData, setFormData] = useState({
    projectName: "",
    designerName: "",
    rating: 0,
    ratingCount: 0,
    TotalRatings: {
      Consistence: 0,
      Colour_Pallets: 0,
      Contrast: 0,
      Typoghraphy: 0,
      Look_and_Feel: 0,
    },
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submiting, setSubmiting] = useState(false);

  const tagList = [
    "Commercial",
    "Graphical UI",
    "Landing Page UI",
    "Touch Screen UI",
    "Gesture-Based UI",
    "Mordern",
    "Classic UI",
    "System-Based",
    "Menu - Driven UI",
  ];

  const handelChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    setFormErrors(
      validateValues({ formData, selectedTag, imgRef1, imgRef2, imgRef3 })
    );
    setSubmiting(true);
  };

  const handelReset = () => {
    setFormData({
      projectName: "",
      designerName: "",
      rating: 0,
      ratingCount: 0,
      TotalRatings: {
        Consistence: 0,
        Colour_Pallets: 0,
        Contrast: 0,
        Typoghraphy: 0,
        Look_and_Feel: 0,
      },
    });
    setImg1(null);
    setImg2(null);
    setImg3(null);
    setSelectedTag([]);
  };

  useEffect(() => {
    const uploadImages = async (images) => {
      let imagesUrlArray = [];

      for (let i = 0; i < images.length; i++) {
        const fileName = `designs/${user.uid}/${formData.projectName}/${
          images[i].name + new Date()
        }`;
        const storageRef = ref(imageDb, fileName);
        await uploadBytes(storageRef, images[i]);
        const imageUrl = await getDownloadURL(storageRef);

        imagesUrlArray.push(imageUrl);
      }

      return imagesUrlArray; // array of URLS of uploaded files
    };

    const setDesignDoc = async () => {
      const urls = await uploadImages([img1, img2, img3]);

      const data = {
        ...formData,
        designUrl: urls,
        tags: selectedTag,
        uid: user.uid,
        userEmail: user.email,
      };

      const designCol = collection(db, "designs");
      await addDoc(designCol, data)
        .then((res) => {
          setLoading(false);
          setSubmiting(false);
          handelReset();
          console.log(res);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          setSubmiting(false);
          console.log(error);
        });
    };

    if (submiting && Object.keys(formErrors).length === 0) {
      setDesignDoc();
    } else {
      setSubmiting(false);
      setLoading(false);
      setError(false);
    }
    // eslint-disable-next-line
  }, [submiting]);

  const validateValues = (inputValues) => {
    let errors = {};

    if (inputValues.projectName === "") {
      errors.projectName = "Field cannot be empty";
    }
    if (inputValues.designerName === "") {
      errors.designerName = "Field cannot be empty";
    }
    if (selectedTag.length === 0) {
      errors.selectedTag = "Not selected";
    }
    if (!img1) {
      errors.img1 = "Not selected";
    }
    if (!img2) {
      errors.img2 = "Not selected";
    }
    if (!img3) {
      errors.img3 = "Not selected";
    }

    return errors;
  };

  return (
    <>
      <Topbar />
      <div className="updesign">
        <div className="upds">
          <div className="upds1">Upload</div>
          <div className="upds2">
            <div className="upds21">Upload your design</div>
            <div className="upds22">
              <div className="upds221">Project Name</div>
              <input
                type="text"
                value={formData.projectName}
                id="projectName"
                placeholder="Type your Project Name"
                onChange={handelChanges}
              />
            </div>
            <div className="upds22">
              <div className="upds221">Designer Name</div>
              <input
                type="text"
                value={formData.designerName}
                id="designerName"
                placeholder="Type your User name"
                onChange={handelChanges}
              />
            </div>
            <div className="upds22">
              <div className="upds221">Select category</div>
              <div className="upds222" onClick={() => setIsOpen(true)}>
                <p style={{ fontSize: "16px" }}>Select</p>
                <SlArrowDown className="upds2221" />
              </div>
            </div>

            <div
              className="upds25"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <div className="upds251">
                <span style={{ color: "white" }}>Select Categories</span>
                <IoCloseCircleOutline
                  onClick={() => setIsOpen(false)}
                  style={{ fontSize: "2vw", cursor: "pointer" }}
                />
              </div>
              <div className="upds252">
                <div className="upds2521">
                  {tagList
                    .filter((tag) => !selectedTag.includes(tag))
                    .map((tag, index) => {
                      return (
                        <div
                          onClick={() => setSelectedTag([...selectedTag, tag])}
                          key={index}
                        >
                          {tag}
                        </div>
                      );
                    })}
                </div>
                <div className="upds2522"></div>
                <div className="upds2523">
                  {selectedTag.map((tag, index) => {
                    return (
                      <div
                        onClick={() =>
                          setSelectedTag(
                            selectedTag.filter((val) => val !== tag)
                          )
                        }
                        key={index}
                      >
                        {tag}{" "}
                        <IoClose
                          style={{ marginLeft: "10px", fontSize: "1.2vw" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="upds23">
              <div onClick={() => imgRef1.current.click()} className="upds231">
                <input
                  type="file"
                  hidden
                  ref={imgRef1}
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    setImg1(e.target.files[0]);
                  }}
                />
                <div>
                  <BiSolidCloudUpload
                    // hidden={img1 !== null}
                    style={{
                      color: "#ffffff",
                      fontSize: "5vw",
                      display: img1 !== null ? "none" : "block",
                    }}
                  />
                  <img
                    hidden={img1 === null}
                    src={img1 && URL.createObjectURL(img1)}
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "0.8vw" }}
                  />
                </div>
              </div>
              <div onClick={() => imgRef2.current.click()} className="upds231">
                <input
                  type="file"
                  hidden
                  ref={imgRef2}
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    setImg2(e.target.files[0]);
                  }}
                />
                <div>
                  <BiSolidCloudUpload
                    // hidden={img2 !== null}
                    style={{
                      color: "#ffffff",
                      fontSize: "5vw",
                      display: img2 !== null ? "none" : "block",
                    }}
                  />
                  <img
                    hidden={img2 === null}
                    src={img2 && URL.createObjectURL(img2)}
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "0.8vw" }}
                  />
                </div>
              </div>
              <div onClick={() => imgRef3.current.click()} className="upds231">
                <input
                  type="file"
                  hidden
                  ref={imgRef3}
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    setImg3(e.target.files[0]);
                  }}
                />
                <div>
                  <BiSolidCloudUpload
                    // hidden={img3 !== null}
                    style={{
                      color: "#ffffff",
                      fontSize: "5vw",
                      display: img3 !== null ? "none" : "block",
                    }}
                  />
                  <img
                    hidden={img3 === null}
                    src={img3 && URL.createObjectURL(img3)}
                    alt=""
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "0.8vw" }}
                  />
                </div>
              </div>
            </div>
            <div className="upds24">
              <button
                disabled={loading}
                className="upds241"
                onClick={handleSubmit}
              >
                {loading ? "loading..." : "Save"}
              </button>
              <button
                disabled={loading}
                onClick={handelReset}
                className="upds241"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updesign;
