import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

export default function SignUp() {
    const [name,setName] = useState('')
    const [mobile,setMobile] = useState('')
    const [password,setPassword] = useState('')
    async function registerUser(ev){
        ev.preventDefault()
        try {
          await axios.post('/signup',{
              name,
              mobile,
              password,
         }) 
         alert('Account creation confirmed. Welcome!')
        } catch (error) {
          alert('Oops! It seems this mobile number is already taken. Please enter a different number to continue..')
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex p-6 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-10 bg-white shadow-md rounded-xl">
        {/* Left Section */}
        <div className="flex-1">
          <Link to="/" className="font-semibold text-4xl text-blue-600">
            <span className="px-3 py-2 rounded italic"> Create an Account</span>
          </Link>
          <p className="text-sm mt-5 text-gray-700">
            Discover comfort and convenience in our guest rooms. Reserve your spot now⚡..
          </p>
        </div>
        {/* Right Section */}
        <div className="flex-1">
          <form className="flex flex-col gap-6" onSubmit={registerUser} >
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="Pick a unique username"
                value={name} 
                onChange={ev => setName(ev.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm  block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mobile_Number</label>
              <input
                type="tel"
                placeholder="e.g., 123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={mobile} 
                onChange={ev => setMobile(ev.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm  block w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********" 
                value={password} 
                onChange={ev => setPassword(ev.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm block w-full"
              />
            </div>
            <button className="bg-gradient-to-r from-blue-400 to-red-300 text-white py-2 rounded-md font-semibold hover:from-red-300 hover:to-blue-400 transition duration-300">
              Sign Up
            </button>
          </form>
          <div className='flex gap-2 text-sm mt-5 text-gray-700'>
            <span>Already have an account?</span>
            <Link to='/signin' className='text-blue-600 hover:text-red-600 transition duration-300'>
              Sign In 
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}
