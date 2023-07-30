import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/loginscreen.js";
import Landing from "./components/Landing";
import Signup from "./components/signup";
import Cookies from "js-cookie";
import axios from "axios";

const useInitialLoggedInState = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return Cookies.get("loggedIn") === "true";
  });

  useEffect(() => {
    Cookies.set("loggedIn", loggedIn ? "true" : "false");
  }, [loggedIn]);

  return [loggedIn, setLoggedIn];
};

const App = () => {
  const [loggedIn, setLoggedIn] = useInitialLoggedInState();
  const [unloading, setUnloading] = useState(false);
  const [tabClosed, setTabClosed] = useState(false);

  const handleLogout = async () => {
    if (loggedIn && !unloading && tabClosed) {
      const token = Cookies.get("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios.post("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/logout", null, config).finally(() => {
        setUnloading(true);
        Cookies.remove("token");
        Cookies.remove("activePage");
        Cookies.set("loggedIn", "false");
        setLoggedIn(false);
      });
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      setTabClosed(true);
      if (!event.currentTarget.performance.navigation.type === 1) {
        setUnloading(true);
        handleLogout();
      }
    };

    const handleVisibilityChange = () => {
      if (
        document.visibilityState === "hidden" &&
        loggedIn &&
        !unloading &&
        tabClosed
      ) {
        setUnloading(true);
        handleLogout();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [loggedIn, tabClosed]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    const loggedInCookie = Cookies.get("loggedIn");
    if (loggedInCookie === "true") {
      Cookies.remove("token");
      Cookies.remove("activePage");
      Cookies.set("loggedIn", "false");
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login setLoggedIn={setLoggedIn} handleLogin={handleLogin} />
          }
        />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/Landing/*"
          element={loggedIn ? <Landing /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
