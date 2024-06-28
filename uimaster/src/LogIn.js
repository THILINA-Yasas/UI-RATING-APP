import React, { useRef, useState } from "react";
import "./Container.css";
import db, { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { login } from "./app/userSlice";
import { useDispatch } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";

function LogIn() {
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const singinUser = (data) => {
    auth
      .signInWithEmailAndPassword(
        userRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        dispatch(login({ uid: data.id, email: data.email, name: data.name }));
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getUserDoc = async () => {
    setError(false);
    setLoading(true);
    const userCollection = collection(db, "Users");
    const q = query(
      userCollection,
      where("email", "==", userRef.current.value.toString())
    );
    getDocs(q)
      .then((response) => {
        if (response.docs.length < 1) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = response.docs[0].data(q);
        singinUser(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="hmpg">
      <div className="hmpg1">
        <div className="hmpg11">
          <div className="hmpg111">
            UI <span id="cl1">Master</span>
          </div>
          <div className="hmpg112">WELCOME</div>
          <div className="hmpg113">This is your dream place</div>
          <div className="hmpg114">Skip Login</div>
        </div>
        <div className="hmpg12">
          <div className="hmpg121">Login</div>
          <div className="hmpg123">
            <input
              ref={userRef}
              placeholder=" User name"
              className="loginsearch"
            />
          </div>
          <div className="hmpg124">
            <input
              ref={passwordRef}
              placeholder=" Password"
              className="loginsearch"
              type="password"
            />
          </div>
          <div className="hmpg125">
            Forgot Password?&nbsp;<u> Click Here</u>
          </div>
          <div className="hmpg126" onClick={() => getUserDoc()}>
            {loading ? "loading..." : "Login"}
          </div>
          <div className="hmpg127" onClick={() => navigate("/auth/register")}>
            Register Now
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
