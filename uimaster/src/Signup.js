import { collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import db, { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateValues = (inputValues) => {
    let errors = {};
    const emailRegEx = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/;

    if (inputValues.name == "") {
      errors.name = "User Name can not be empty.";
    }
    if (!emailRegEx.test(inputValues.email)) {
      errors.email = "Email is not valid.";
    }
    if (inputValues.password !== inputValues.confirmPassword) {
      errors.password = "Passwords do not match.";
    }
    if (inputValues.password.length < 6) {
      errors.password = "Password is too short.";
    }
    return errors;
  };

  const handelChanges = (e) => {
    setFormdata({ ...formData, [e.target.id]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setFormErrors(validateValues(formData));
    setSubmitting(true);
  };

  useEffect(() => {
    const { password, confirmPassword, ...rest } = formData;
    const userCollection = collection(db, "Users");
    const createUser = async () => {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
        .then((credentials) => {
          createUserDoc(credentials);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.log(error);
        });
    };

    const createUserDoc = async (credentials) => {
      await setDoc(doc(userCollection, credentials.user.uid), {
        ...rest,
        id: credentials.user.uid,
        emailVerified: credentials.user.emailVerified,
      })
        .then(() => {
          navigate("/auth/login");
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.log(error);
        });
    };

    if (submitting && Object.keys(formErrors).length === 0) {
      createUser();
      setSubmitting(false);
    } else if (Object.keys(formErrors).length > 0) {
      setLoading(false);
    }
  }, [submitting, formErrors]);

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
          <div className="hmpg121">Register</div>
          <div className="hmpg124">
            <input
              id="name"
              onChange={handelChanges}
              value={formData.name}
              placeholder=" User name"
              className="loginsearch"
            />
            {formErrors.name && (
              <p style={{ margin: 0, color: "red" }}>{formErrors.name}</p>
            )}
          </div>
          <div className="hmpg124">
            <input
              id="email"
              onChange={handelChanges}
              value={formData.email}
              placeholder=" Email"
              className="loginsearch"
            />
            {formErrors.email && (
              <p style={{ margin: "1px", color: "red" }}>{formErrors.email}</p>
            )}
          </div>

          <div className="hmpg124">
            <input
              id="password"
              onChange={handelChanges}
              value={formData.password}
              placeholder=" Password"
              className="loginsearch"
              type="password"
            />
            {formErrors.password && (
              <p style={{ margin: 0, color: "red" }}>{formErrors.password}</p>
            )}
          </div>
          <div className="hmpg124">
            <input
              id="confirmPassword"
              onChange={handelChanges}
              value={formData.confirmPassword}
              placeholder=" Confirm Password"
              className="loginsearch"
              type="password"
            />
            {formErrors.password && (
              <p style={{ margin: 0, color: "red" }}>{formErrors.password}</p>
            )}
          </div>
          <div className="hmpg125">
            Forgot Password?&nbsp;<u> Click Here</u>
          </div>
          <div className="hmpg126" onClick={handelSubmit}>
            {loading ? "loading..." : "Register Now"}
          </div>

          {error && <p className="text-red-500">Submission Failed.</p>}
        </div>
      </div>
    </div>
  );
}

export default Signup;
