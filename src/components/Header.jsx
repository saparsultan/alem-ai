import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>ALEM AI</span>
      </div>
      <ul className="nav">
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                color: isActive ? "#a47af9" : "#d7c9fc",
              };
            }}
          >
            Чат
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/images"
            style={({ isActive }) => {
              return {
                color: isActive ? "#a47af9" : "#d7c9fc",
              };
            }}
          >
            Изображение
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
