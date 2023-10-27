import "./LandingPage.css";
import Logo from "../assets/logo.svg";
import Button from "../../components/Button.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, Link } from "react-router-dom";
import { RegisterModal } from "../../components/RegisterModal";
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth, provider } from "../../config/firebase"; // Added 'provider' to import
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="container">
      <header className="header">
        <span>
          <Link to="/">
            <img src={Logo} alt="aquarizz-logo" />
          </Link>
        </span>
        <div className="contactUsBtnContainer">
          {/* <input className="contactUsBtn" type="button" value="Contact us" />
          <FontAwesomeIcon className="contactUsIcon" icon={faEnvelope} /> */}
          <Button>Contact us</Button>
        </div>
      </header>
      <main className="hero">
        <div className="heroText">
          <span className="heroHeader">
            <h2>Connecting</h2>
            <span className="italic">for the Love of Healthy Fish</span>
          </span>
          <span className="heroFooter">
            A Social media community to connect and sell your items.
          </span>
          <br />
          <br />
          <Button className="signUpBtn" onClick={() => setShow(true)}>
            Join Now!
          </Button>
          <RegisterModal onClose={() => setShow(false)} show={show} />
        </div>
        <div className="heroForm">
          <div className="card">
            <h1>Login</h1>
            <form>
              <div className="inputBoxes usernameBox">
                <input className="usernameFld" placeholder="Username" />
                <FontAwesomeIcon className="icon" icon={faUser} />
              </div>
              <div className="inputBoxes passwordBox">
                <input className="passwordFld" placeholder="Password" />
                <FontAwesomeIcon className="icon" icon={faLock} />
              </div>

              <div className="rememberMeBox">
                <input className="checkboxBtn" type="checkbox" />
                <label>Remember me</label>
              </div>
              <Button className="loginBtn">Login</Button>

              <div className="forgotBox">
                <Button className="forgotBtn">Forgot Password</Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className="footer"></footer>

      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Wrapped the component with {} */}
      </Routes>
    </div>
  );
};

const newPost = {
  id: "string",
  userId: "string",
  title: "string",
  username: "string",
  description: "string",
};

console.log(newPost.title);

const Main = () => {
  const [postsList, setPostsList] = React.useState(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postsList &&
        postsList.map((post) => {
          return <PostComponent post={post} />; // Assuming PostComponent is defined somewhere
        })}
    </div>
  );
};

export default LandingPage; // Exporting the LandingPage component
