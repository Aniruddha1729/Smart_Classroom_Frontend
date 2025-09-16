import React from 'react'

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-slate-800 to-blue-600 px-8 py-4 flex flex-row items-center h-15 justify-between">
      <div className="flex items-center gap-5">
        <img src="logo.svg" alt="Logo" className="h-10 w-auto" />
        <h1 className="text-white m-0 text-2xl h-10">My Website</h1>
      </div>
     
      <ul className="flex gap-6 list-none">
        <li><a href="#home" className="text-white no-underline font-medium text-lg transition-colors duration-200 hover:text-yellow-400">Home</a></li>
        <li><a href="#about" className="text-white no-underline font-medium text-lg transition-colors duration-200 hover:text-yellow-400">About</a></li>
        <li><a href="#services" className="text-white no-underline font-medium text-lg transition-colors duration-200 hover:text-yellow-400">Services</a></li>
        <li><a href="#contact" className="text-white no-underline font-medium text-lg transition-colors duration-200 hover:text-yellow-400">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar;
