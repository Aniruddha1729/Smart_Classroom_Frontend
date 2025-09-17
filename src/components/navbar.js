import React from 'react'


function Navbar() {
  return (
    <nav className="px-6 md:px-10 py-4 flex flex-row items-center justify-between bg-gradient-to-r from-slate-800 to-blue-600 shadow-sm">
      <div className="flex items-center gap-4">
        <img src="logo.svg" alt="Logo" className="h-9 w-auto" />
        <h1 className="m-0 text-xl md:text-2xl font-semibold text-white">SmartStacks</h1>
      </div>
      
      <ul className="hidden md:flex gap-6 list-none items-center">
        <li><a href="#home" className="text-white/90 no-underline font-medium text-base md:text-lg transition-colors duration-200 hover:text-white">Home</a></li>
        <li><a href="#about" className="text-white/90 no-underline font-medium text-base md:text-lg transition-colors duration-200 hover:text-white">About</a></li>
        <li><a href="#services" className="text-white/90 no-underline font-medium text-base md:text-lg transition-colors duration-200 hover:text-white">Services</a></li>
        <li><a href="#contact" className="text-white/90 no-underline font-medium text-base md:text-lg transition-colors duration-200 hover:text-white">Contact</a></li>
      </ul>
      
      <div className="md:hidden" aria-hidden>
        {/* Mobile menu placeholder */}
        <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-800"></div>
      </div>
    </nav>
  )
}

export default Navbar;
