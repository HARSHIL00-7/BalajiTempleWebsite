import "./signup.css";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import {
  faEye,
  faEyeSlash,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DOMPurify from "dompurify";
import { PhoneInput, usePhoneValidation } from "react-international-phone";
import "react-international-phone/style.css";
import { isValidNumber } from "libphonenumber-js";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const [showPasswordRules, setShowPasswordRules] = useState(false); 
  const navigate = useNavigate();
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneValidation = usePhoneValidation(phoneNumber);

  const handleUsernameChange = async (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
    setIsUsernameAvailable(false);
    if (enteredUsername.trim() !== "") {
      await checkUsernameAvailability(enteredUsername);
    }
  };

  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.post(
        `http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/check_username/${username}`
      );
      setIsUsernameAvailable(true);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setIsUsernameAvailable(false);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);

    setShowPasswordRules(password !== "");

    if (passwordRules.every((rule) => rule.fulfilled)) {
      setShowPasswordRules(false);
    }
  };
  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };
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
    const { hasSpecialSymbol } = getPasswordRules();

    if (hasSpecialSymbol) {
      alert(
        "Please remove the following special symbols from the password: <, >, or space"
      );
      return;
    }
    if (!phoneValidation.isValid) {
      alert("Please enter a valid phone number.");
      return;
    }

    function isValidEmail(email) {
      return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      );
    }

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
    if (confirmPassword === "") {
      alert("Please confirm your password.");
      return;
    }
    if (phoneNumber === "") {
      alert("Please enter your phone number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    if (!isCaptchaSolved) {
      alert("Please solve the reCAPTCHA.");
      return;
    }
    if (!isValidNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!validateUsername(username)) {
      alert("Please enter a valid username.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email ID.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      const lowerCaseUsername = username.toLowerCase();
      if (password.toLowerCase().includes(lowerCaseUsername)) {
        alert(
          "username should not be used in the password please re-enter the password."
        );
        return false; 
      }
      return;
    }

    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    const sanitizedPhoneNumber = DOMPurify.sanitize(phoneNumber);

    try {
      const response = await axios.post("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/signup", {
        username: sanitizedUsername,
        email: sanitizedEmail,
        password: sanitizedPassword,
        phoneNumber: sanitizedPhoneNumber,
      });

      if (
        response.status === 200 &&
        response.data.message === "Signup successful"
      ) {
        alert("Signup successful. Please log in.");
        navigate("/");
      } else {
        alert("An error occurred while signing up. Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail === "Username already exists"
      ) {
        alert("Username already exists. Please choose a different username.");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail === "Email already registered"
      ) {
        alert(
          "Email already registered. Please choose a different email, or login with your registered username."
        );
      } else {
        alert("An error occurred while signing up. Please try again.");
      }
    }
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_\s]{2,20}$/;
    return regex.test(username);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(
        (prevShowConfirmPassword) => !prevShowConfirmPassword
      );
    }
  };
  const getPasswordRules = () => {
    const hasSpecialSymbol = /[<> ]/.test(password);
    const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(password);

    const rules = [
      { id: 1, text: "At least 8 characters", fulfilled: password.length >= 8 },
      {
        id: 2,
        text: "Contains a lowercase letter",
        fulfilled: /[a-z]/.test(password),
      },
      {
        id: 3,
        text: "Contains an uppercase letter",
        fulfilled: /[A-Z]/.test(password),
      },
      { id: 4, text: "Contains a number", fulfilled: /[0-9]/.test(password) },
      {
        id: 5,
        text: "Does not contain special symbols <, >, or space",
        fulfilled: !hasSpecialSymbol,
      },
      {
        id: 6,
        text: "Contains at least one special character",
        fulfilled: hasSpecialCharacter,
      },
    ];

    return rules;
  };

  const passwordRules = getPasswordRules();
  const allRulesFulfilled = passwordRules.every((rule) => rule.fulfilled);
  const getPasswordStrength = (password) => {
    const criteria = {
      weak: 3,
      medium: 4,
    };

    let strength = "weak";

    let fulfilledCriteria = 0;
    if (password.length >= 8) {
      fulfilledCriteria++;
    }
    if (/[a-z]/.test(password)) {
      fulfilledCriteria++;
    }
    if (/[A-Z]/.test(password)) {
      fulfilledCriteria++;
    }
    if (/[0-9]/.test(password)) {
      fulfilledCriteria++;
    }
    const lowerCaseUsername = username.toLowerCase();
    if (!password.toLowerCase().includes(lowerCaseUsername)) {
      fulfilledCriteria++;
    }

    if (fulfilledCriteria >= criteria.medium && allRulesFulfilled) {
      strength = "strong";
    } else if (fulfilledCriteria >= criteria.weak) {
      strength = "medium";
    }

    return strength;
  };

  return (
    <div className="container3">
      <div className="signup-box">
        <div className="image-container2">
          <img
            src={process.env.PUBLIC_URL + "/assets/LoginTemple.jpg"}
            alt="Login"
          />
        </div>
        <div className="details-container">
          <h2 className="login-heading">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div
              className={`input-container1 ${
                isUsernameAvailable ? "border-green" : "border-red"
              }`}
            >
              <input
                className={`i1 ${
                  isUsernameAvailable ? "available" : "not-available"
                }`}
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              {username.trim() === "" ||
                (!isUsernameAvailable && (
                  <div className="icon-container">
                    <FontAwesomeIcon className="wrong-icon" icon={faTimes} />
                  </div>
                ))}
              {isUsernameAvailable && (
                <div className="icon-container">
                  <FontAwesomeIcon className="verified-icon" icon={faCheck} />
                </div>
              )}
            </div>
            <div className="input-container1">
              <input
                className="i1"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-container1">
              <PhoneInput
                defaultCountry="in"
                forceDialCode="false"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                required
              />
            </div>

            <div className="input-container1">
              <input
                className="password-input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
                style={{
                  borderBottomColor:
                    getPasswordStrength(password) === "weak"
                      ? "crimson"
                      : getPasswordStrength(password) === "medium"
                      ? "gold"
                      : "seagreen",
                }}
                required
              />
              <div
                className={`svg-container eye ${showPassword ? "visible" : ""}`}
                id="su-pass-show"
                onClick={() => handleTogglePasswordVisibility("password")}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>

            {passwordFocused && (
              <div
                className={`password-rules-container ${
                  allRulesFulfilled ? "" : "show"
                }`}
              >
                {passwordRules.map((rule) => (
                  <div key={rule.id} className="password-rule">
                    <FontAwesomeIcon
                      className={`rule-icon ${
                        rule.fulfilled ? "fulfilled" : "not-fulfilled"
                      }`}
                      icon={rule.fulfilled ? faCheck : faTimes}
                    />
                    <span
                      className={`rule-text ${
                        rule.fulfilled ? "fulfilled" : "not-fulfilled"
                      }`}
                    >
                      {rule.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="input-container1">
              <input
                className="password-input"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className={`svg-container eye ${
                  showConfirmPassword ? "visible" : ""
                }`}
                id="su-pass-show"
                onClick={() =>
                  handleTogglePasswordVisibility("confirmPassword")
                }
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </div>
            </div>

            <div>
              <ReCAPTCHA
                sitekey="key"
                ref={recaptchaRef}
              />
            </div>
            <span className="login-link">
              Already have an account? <a href="/">Log In</a>
            </span>
            <div className="buttons-container">
              {loading ? (
                <div className="spinner" />
              ) : (
                <>
                  {!allRulesFulfilled && (
                    <button type="button" disabled>
                      Please fulfill the password rules
                    </button>
                  )}
                  {allRulesFulfilled && (
                    <>
                      <button type="submit">Submit</button>
                      <button type="button" onClick={handleClear}>
                        Clear
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
