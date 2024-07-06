import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Account() {
    const[redirect, setRedirect] = useState(null)
    const{ready,user,setUser} = useContext(UserContext)

    let{subpage}=useParams()
    if(subpage===undefined){
        subpage='profile'
    }
    async function signout(){
        await axios.post('/signout')
        setRedirect('/')
        setUser(null)
    }

    if(!ready){
        return 'Loading...'
    }
    if(ready && !user && !redirect){
        return <Navigate to={'/signin'}/>
    }
    function linkclasses(type=null){
        let classes= " py-2 px-4 hover:bg-red-50 rounded-md"
        if(type === subpage){
            classes+=" italic text-blue-500 rounded-md"
        }
        return classes
    }
    if (redirect) {
        return <Navigate to={redirect} />
      }

  return (
    <div>
        
        <nav className="w-full flex justify-center mt-10 gap-4 mb-10 font-serif ">
        <Link className={linkclasses('profile')} to="/account">My Account</Link>
        <Link className={linkclasses('bookings')} to="/account/bookings">Reserved Stays <span role="img" aria-label="Reserved Stays"><span>🔐👨‍👩‍👧‍👦</span></span></Link>
        <Link className={linkclasses('places')} to="/account/places">My Rentals <span role="img" aria-label="My Rentals"><span>🏠🛏️</span></span></Link>
        </nav>
    {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto mt-8">
          <p className="text-lg font-serif">Logged in as {user.name}</p>
          <button onClick={signout} className="mt-4 bg-blue-400 text-white py-2 px-2 rounded-xl font-serif hover:bg-red-50 hover:text-black transition duration-300">
            Signout
          </button>
        </div>
      )}

    </div>
    
  )
}
