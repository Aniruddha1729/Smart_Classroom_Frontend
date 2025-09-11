import React from 'react'

function navbar() {
  return (
    <div>
        <nav className="navbar">
            <h1>My Website</h1>
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default navbar
