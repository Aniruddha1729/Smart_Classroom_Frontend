import React from 'react'

import './loginpage.css'



function LoginPage() {
  return (
    <div className='login-page'>
      <div className='logo'>
        <img src="logo.svg" alt="logo" />
      </div>
      <div className='login-container'>
        <h1>Admin Login</h1>
        <form className='login-form'>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className='btn-grad'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage