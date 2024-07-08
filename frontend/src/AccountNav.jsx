import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function AccountNav() {
    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2]
    if(subpage === undefined){
        subpage ='profile'
    }
    function linkclasses(type=null){
        let classes= " py-2 px-4 hover:bg-red-50 rounded-md"
        if(type === subpage){
            classes+=" italic text-blue-500 rounded-md"
        }
        return classes
    }
  return (
    <nav className="w-full flex justify-center mt-10 gap-4 mb-10 font-serif ">
        <Link className={linkclasses('profile')} to="/account">My Account</Link>
        <Link className={linkclasses('bookings')} to="/account/bookings">Reserved Stays <span role="img" aria-label="Reserved Stays"><span>🔐👨‍👩‍👧‍👦</span></span></Link>
        <Link className={linkclasses('places')} to="/account/places">My Rentals <span role="img" aria-label="My Rentals"><span>🏠🛏️</span></span></Link>
        </nav>
  )
}
