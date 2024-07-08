import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import AccountNav from "../AccountNav"

export default function Profile() {
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
   
    if (redirect) {
        return <Navigate to={redirect} />
      }

  return (
    <div>
      <AccountNav />
    {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto mt-8">
          <p className="text-lg font-serif">Logged in as {user.name}</p>
          <button onClick={signout} className="mt-4 bg-blue-400 text-white py-2 px-2 rounded-xl font-serif hover:bg-red-50 hover:text-black transition duration-300">
            Signout
          </button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}

    </div>
    
  )
}
