import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/images/logo.png"

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>Alem AI</span>
      </div>
      <ul className="nav">
        <li>
        <Link to="/">Chat</Link>
        </li>
        <li>
        <Link to="/images">Image</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header