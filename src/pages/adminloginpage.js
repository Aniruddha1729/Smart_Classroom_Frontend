import React, { useState } from 'react'

function LoginPage({ setIsAuthenticated }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      // TODO: Replace with real API call
      if (username.trim() && password.trim()) {
        setTimeout(() => {
          setIsAuthenticated(true)
          setLoading(false)
        }, 400)
      } else {
        setError('Please enter username and password')
        setLoading(false)
      }
    } catch (e) {
      setError('Login failed. Please try again.')
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      // TODO: Replace with real API call
      setTimeout(() => {
        setLoading(false)
        setIsRegistering(false)
      }, 500)
    } catch (e) {
      setError('Registration failed. Please try again.')
      setLoading(false)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-200px)]'>
      <div className='flex flex-col justify-center items-center bg-white w-full max-w-2xl mx-auto rounded-xl shadow-lg shadow-black/20'>
        <div className='w-36 mb-4'>
          <img src="logo.svg" alt="logo" />
        </div>
        <div className='flex flex-col items-center justify-center gap-8 p-8'>
        <h1 className='text-2xl font-bold'>{isRegistering ? 'Admin Register' : 'Admin Login'}</h1>
        {error && (
          <div className='text-red-600 text-sm'>{error}</div>
        )}
        {!isRegistering ? (
          <form onSubmit={handleLoginSubmit} className='flex flex-col gap-4 justify-center items-center p-8 rounded-lg w-full'>
            <div className='relative w-full'>
              <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
              </svg>
              <input 
                type="text" 
                placeholder="Username" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-300 rounded-none focus:border-b-blue-500 focus:outline-none text-base bg-transparent'
              />
            </div>
            <div className='relative w-full'>
              <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
              </svg>
              <input 
                type="password" 
                placeholder="Password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-300 rounded-none focus:border-b-blue-500 focus:outline-none text-base bg-transparent'
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className='bg-gradient-to-r from-[#50C9C3] via-[#96DEDA] to-[#50C9C3] border-none m-2.5 py-4 px-11 text-center uppercase transition-all duration-500 bg-[length:200%_auto] text-white shadow-[0_0_20px_#eee] rounded-lg block hover:bg-[position:right_center] hover:text-white hover:no-underline cursor-pointer disabled:opacity-60'
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className='text-sm'>
              Don't have an account?{' '}
              <button type='button' onClick={() => setIsRegistering(true)} className='text-blue-600 underline'>Register</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className='flex flex-col gap-4 justify-center items-center p-8 rounded-lg w-full'>
            <div className='relative w-full'>
              <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'></path>
              </svg>
              <input 
                type="text" 
                placeholder="Username" 
                required 
                className='w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-300 rounded-none focus:border-b-blue-500 focus:outline-none text-base bg-transparent'
              />
            </div>
            <div className='relative w-full'>
              <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0z'></path>
              </svg>
              <input 
                type="email" 
                placeholder="Email" 
                required 
                className='w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-300 rounded-none focus:border-b-blue-500 focus:outline-none text-base bg-transparent'
              />
            </div>
            <div className='relative w-full'>
              <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
              </svg>
              <input 
                type="password" 
                placeholder="Password" 
                required 
                className='w-full pl-10 pr-3 py-3 border-0 border-b-2 border-gray-300 rounded-none focus:border-b-blue-500 focus:outline-none text-base bg-transparent'
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className='bg-gradient-to-r from-[#50C9C3] via-[#96DEDA] to-[#50C9C3] border-none m-2.5 py-4 px-11 text-center uppercase transition-all duration-500 bg-[length:200%_auto] text-white shadow-[0_0_20px_#eee] rounded-lg block hover:bg-[position:right_center] hover:text-white hover:no-underline cursor-pointer disabled:opacity-60'
            >
              {loading ? 'Registering...' : 'Create account'}
            </button>
            <div className='text-sm'>
              Already have an account?{' '}
              <button type='button' onClick={() => setIsRegistering(false)} className='text-blue-600 underline'>Login</button>
            </div>
          </form>
        )}
      </div>
    </div>
    </div>
  )
}

export default LoginPage