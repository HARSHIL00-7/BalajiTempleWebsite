import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../components/navbar.css';


const Navbar = ({setActivePage}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to the Loginscreen component
  };
  const handleClick = (page) => {
    setActivePage(page);
  };
    const handleLogoClick = () => {
        setActivePage('');
    };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        <img src={`${process.env.PUBLIC_URL}/assets/LoginTemple.jpg`} alt="Logo" />
      </div>
      <ul>

        <li>
          <NavLink to="bhajanamindralu" onClick={() => handleClick('bhajanamindralu')}>Bhajana Mandiralu</NavLink>
        </li>
        <li>
          <NavLink to="newtempleconstruction"  onClick={() => handleClick('reports')}>New Temple Construction</NavLink>
        </li>
        <li>
          <NavLink to="renovation" onClick={() => handleClick('reports')}>Renovation of Temple</NavLink>
        </li>
        <li>
          <NavLink to="users" onClick={() => handleClick('users')}>Users</NavLink>
        </li>
        <li>
          <NavLink to="reports" onClick={() => handleClick('reports')}>Reports</NavLink>
        </li>
        <li className='logout' onClick={handleLogout}>Logout</li>
      </ul>
      <Outlet />
    </nav>
  );
};


export default Navbar;
