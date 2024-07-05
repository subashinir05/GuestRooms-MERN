import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext.jsx'

export default function SignIn() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState('')
  const {setUser}=useContext(UserContext)

  async function handleSigninSubmit(ev){
    ev.preventDefault()
  try {
      const {data} = await axios.post('/signin', {name,password})
      setUser(data)
      alert('Great to see you again! You\'re signed in..')
       
      setRedirect(true)
  } catch (error) {
    alert('Sorry, we couldn\'t sign you in. Please verify your details and retry again..')
  }
  }
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex p-6 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-10 bg-white shadow-md rounded-xl">
        {/* Left Section */}
        <div className="flex-1">
          <Link to="/" className="font-semibold text-4xl text-blue-600">
            <span className="px-3 py-2 rounded italic">Login to Book</span>
          </Link>
          <p className="text-sm mt-5 text-gray-700">
            Discover comfort and convenience in our guest rooms. Reserve your spot now⚡..
          </p>
        </div>
        {/* Right Section */}
        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={handleSigninSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Type your username"
                value={name} 
                onChange={ev => setName(ev.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm  block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type='password'
                placeholder='********'
                value={password} 
                onChange={ev => setPassword(ev.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm block w-full"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-red-300 text-white py-2 rounded-md font-semibold hover:from-red-300 hover:to-blue-400 transition duration-300">
              Sign In
            </button>
          </form>
          <div className='flex gap-2 text-sm mt-5 text-gray-700'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-600 hover:text-red-600 transition duration-300'>
              Sign Up 
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

