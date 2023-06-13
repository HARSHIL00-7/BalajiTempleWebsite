import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ setActivePage }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    navigate('/'); // Redirect to the Loginscreen component
  };

  const handleClick = (page) => {
    setActivePage(page);
    setIsDropdownOpen(false); 
  };

  const handleLogoClick = () => {
    setActivePage('Home');
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav>
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={`${process.env.PUBLIC_URL}/assets/ttd-logo.png`} alt="Logo" />
      </div>

      <ul className={`navbar-menu ${isDropdownOpen ? 'hide' : ''}`}>
      <li>
          <NavLink to="Home" onClick={() => handleClick('Home')}>Home</NavLink>
        </li>
        <li>
          <NavLink to="bhajanamindralu" onClick={() => handleClick('bhajanamindralu')}>Bhajana Mandiralu</NavLink>
        </li>
        <li>
          <NavLink to="newtempleconstruction" onClick={() => handleClick('newtempleconstruction')}>New Temple Construction</NavLink>
        </li>
        <li>
          <NavLink to="renovation" onClick={() => handleClick('renovation')}>Renovation of Temple</NavLink>
        </li>
        <li>
          <NavLink to="users" onClick={() => handleClick('users')}>Users</NavLink>
        </li>
        <li>
          <NavLink to="reports" onClick={() => handleClick('reports')}>Reports</NavLink>
        </li>
      </ul>

      <div className={`dropdown-logo ${isDropdownOpen ? 'active' : ''}`} onClick={handleDropdownToggle}>
        <div className="stripe"></div>
        <div className="stripe"></div>
        <div className="stripe"></div>
      </div>

      {isDropdownOpen && (
        <div className="dropdown-menu">
          <ul>
          <li>
          <NavLink to="Home" onClick={() => handleClick('Home')}>Home</NavLink>
        </li>
            <li>
              <NavLink to="bhajanamindralu" onClick={() => handleClick('bhajanamindralu')}>Bhajana Mandiralu</NavLink>
            </li>
            <li>
              <NavLink to="newtempleconstruction" onClick={() => handleClick('newtempleconstruction')}>New Temple Construction</NavLink>
            </li>
            <li>
              <NavLink to="renovation" onClick={() => handleClick('renovation')}>Renovation of Temple</NavLink>
            </li>
            <li>
              <NavLink to="users" onClick={() => handleClick('users')}>Users</NavLink>
            </li>
            <li>
              <NavLink to="reports" onClick={() => handleClick('reports')}>Reports</NavLink>
            </li>
            <li><NavLink to="/" onClick={() => handleLogout()}>Logout</NavLink></li>
          </ul>
        </div>
      )}

      <div className="navbar-logout">
        <ul>
          <NavLink to="/" onClick={() => handleLogout()}>Logout</NavLink>
        </ul>
      </div>
      
    </nav>
  );
};

export default Navbar;
