import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
import Cookies from "js-cookie";

const Navbar = ({ setActivePage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [lastActivePage, setLastActivePage] = useState("");

  useEffect(() => {
    fetchUserRole();
    setActivePage(Cookies.get("lastActivePage") || "");
  }, []);

  const fetchUserRole = async () => {
    try {
      const token = Cookies.get("token");

      const response = await axios.get("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/check_role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const role = response.data;
        setCurrentUserRole(role);
      } else {
        throw new Error("Failed to fetch role information");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (page) => {
    setLastActivePage(page);

    setIsDropdownOpen(false);

    if (
      page === "users" ||
      page === "renovation" ||
      page === "newtempleconstruction"
    ) {
      await fetchUserRole();
      const userRole = currentUserRole;
      if (userRole !== "super_admin") {
        alert("Only super admins can access this page");
        navigate(Cookies.get("lastActivePage"));
        return;
      }
    }
    setActivePage(page);
  };

  const handleLogout = async () => {
    const token = Cookies.get("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/logout", null, config)
      .then(() => {
        Cookies.remove("token");
        Cookies.remove("activePage");
        Cookies.set("loggedIn", "false");
        navigate("/");
        alert("Logout successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogoClick = () => {
    setLastActivePage("Home");
    setActivePage("Home");
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={`${process.env.PUBLIC_URL}/assets/ttd-logo.png`} alt="Logo" />
      </div>

      <ul className={`navbar-menu ${isDropdownOpen ? "hide" : ""}`}>
        <li>
          <NavLink to="Home" onClick={() => handleClick("Home")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="bhajanamindralu"
            onClick={() => handleClick("bhajanamindralu")}
          >
            Bhajana Mandiralu
          </NavLink>
        </li>
        <li>
          <NavLink
            to="newtempleconstruction"
            onClick={() => handleClick("newtempleconstruction")}
          >
            New Temple Construction
          </NavLink>
        </li>
        <li>
          <NavLink to="renovation" onClick={() => handleClick("renovation")}>
            Renovation of Temple
          </NavLink>
        </li>
        <li>
          <NavLink to="users" onClick={() => handleClick("users")}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="reports" onClick={() => handleClick("reports")}>
            Reports
          </NavLink>
        </li>
      </ul>

      <div
        className={`dropdown-logo ${isDropdownOpen ? "active" : ""}`}
        onClick={handleDropdownToggle}
      >
        <div className="stripe"></div>
        <div className="stripe"></div>
        <div className="stripe"></div>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <NavLink to="Home" onClick={() => handleClick("Home")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="bhajanamindralu"
                onClick={() => handleClick("bhajanamindralu")}
              >
                Bhajana Mandiralu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="newtempleconstruction"
                onClick={() => handleClick("newtempleconstruction")}
              >
                New Temple Construction
              </NavLink>
            </li>
            <li>
              <NavLink
                to="renovation"
                onClick={() => handleClick("renovation")}
              >
                Renovation of Temple
              </NavLink>
            </li>
            <li>
              <NavLink to="users" onClick={() => handleClick("users")}>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="reports" onClick={() => handleClick("reports")}>
                Reports
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={() => handleLogout()}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      <div className="navbar-logout">
        <ul>
          <NavLink to="/" onClick={() => handleLogout()}>
            Logout
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
