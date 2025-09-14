import React from 'react'

import './navbar.css'


function Navbar() {
  return (
    <nav className="navbar">
   
        <div className="navbar-logo">
          <img src="logo.svg" alt="Logo" />
          <h1>My Website</h1>
        </div>
     
      <ul className="flex gap-6">
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </ul>
    </nav>
  )
}

export default Navbar;
