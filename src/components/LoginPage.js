import React from 'react'


function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center bg-white w-1/2 rounded-xl shadow-lg shadow-black/20'>
      <div className='w-36 mb-4'>
        <img src="logo.svg" alt="logo" />
      </div>
      <div className='flex flex-col items-center justify-center gap-8 p-8'>
        <h1 className='text-2xl font-bold'>Admin Login</h1>
        <form className='flex flex-col gap-4 justify-center items-center p-8 rounded-lg w-full max-w-md'>
          <input 
            type="text" 
            placeholder="Username" 
            required 
            className='w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-base'
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            className='w-full p-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-base'
          />
          <button 
            type="submit" 
            className='bg-gradient-to-r from-[#50C9C3] via-[#96DEDA] to-[#50C9C3] border-none m-2.5 py-4 px-11 text-center uppercase transition-all duration-500 bg-[length:200%_auto] text-white shadow-[0_0_20px_#eee] rounded-lg block hover:bg-[position:right_center] hover:text-white hover:no-underline cursor-pointer'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage