import React from 'react'

function LoginPage() {
  return (
    <div className='flex flex-col justify-center items-center bg-white w-1/2 rounded-xl shadow-lg shadow-black/20'>
      <div className='w-36 mb-4'>
        <img src="logo.svg" alt="logo" />
      </div>
      <div className='flex flex-col items-center justify-center gap-8 p-8'>
        <h1 className='text-2xl font-bold'>Admin Login</h1>
        <form className='flex flex-col gap-4 justify-center items-center p-8 rounded-lg w-full max-w-lg'>
          <div className='relative w-full max-w-sm'>
            <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
            </svg>
            <input 
              type="text" 
              placeholder="Username" 
              required 
              className='w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-300 rounded-none focus:border-b-blue-500 focus:outline-none text-base min-w-80 bg-transparent'
            />
          </div>
          <div className='relative w-full max-w-sm'>
            <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
            </svg>
            <input 
              type="password" 
              placeholder="Password" 
              required 
              className='w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-300 rounded-none focus:border-b-blue-500 focus:outline-none text-base min-w-80 bg-transparent'
            />
          </div>
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