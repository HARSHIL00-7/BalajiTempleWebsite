import React, { useState, useRef, useEffect } from "react";
import "./loginscreen.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleWindowBack = () => {
      navigate("/");
    };

    window.addEventListener("popstate", handleWindowBack);

    return () => {
      window.removeEventListener("popstate", handleWindowBack);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isCaptchaSolved =
      recaptchaRef.current && recaptchaRef.current.getValue() !== "";

    if (username === "") {
      alert("Please enter a username.");
      return;
    }

    if (password === "") {
      alert("Please enter a password.");
      return;
    }

    if (!isCaptchaSolved) {
      alert("Please solve the reCAPTCHA.");
      return;
    }

    if (!validateUsername(username)) {
      alert("Please enter a valid username.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Please enter a valid password.");
      return;
    }
    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);
    try {
      const response = await axios.post("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/authenticate", {
        username: sanitizedUsername,
        password: sanitizedPassword,
      });
      const token = response.data.access_token;

      setCookie("token", token, 7);

      setLoggedIn(true);

      localStorage.setItem("activePage", "Home");
      navigate("/Landing/Home");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail ===
          "User is already logged in from another device or browser"
      ) {
        alert("User is already logged in from another device or browser");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }

    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${encodeURIComponent(
        value
      )}; ${expires}; path=/`;
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_\s]{3,20}$/;
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9!@#$%^&*()-=_+{}[\]:;,?/|~]*$/;

    return regex.test(password);
  };
  const handleClear = () => {
    setUsername("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <div className="container1">
      <img
        className="left-image"
        src={process.env.PUBLIC_URL + "/assets/ttd2.png"}
        alt="Left Image"
      />
      <img
        className="right-image"
        src={process.env.PUBLIC_URL + "/assets/loginbg2.png"}
        alt="Right Image"
      />
      <div className="login-box">
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + "/assets/LoginTemple.jpg"}
            alt="Login"
          />
        </div>
        <div className="details-container">
          <h2 className="login-heading">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                className="i1"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <input
                className="i1"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={`svg-container eye ${showPassword ? "visible" : ""}`}
                id="su-pass-show"
                onClick={() => handleTogglePasswordVisibility()}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>

            <div>
              <ReCAPTCHA
                sitekey="key"
                ref={recaptchaRef}
              />
            </div>
            <div className="remember-me-container">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me!</label>
            </div>
            <span className="signup-link">
              Don't have an account?{" "}
              <u>
                <a href="/signup">Sign Up</a>
              </u>
            </span>
            <div className="buttons-container">
              {loading ? (
                <div className="spinner" />
              ) : (
                <>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleClear}>
                        Clear
                      </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
