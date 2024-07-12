import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext.jsx';

export default function Headers() {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  const subpage = pathname.split('/')?.[2] || 'profile'; // Default to 'profile' if no subpage

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function linkClasses(type) {
    let classes = "text-lg py-2 px-4 rounded-md";
    if (type === subpage) {
      classes += " text-blue-700 hover:text-blue-700 rounded-md";
    }
    return classes;
  }

  return (
    <header className="py-4 px-6 flex justify-between items-center shadow-md relative font-serif bg-white">
    <Link to={'/'} className="flex items-center gap-4 text-black">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hover:text-blue-600 size-6">
    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
    <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
  </svg>
      <div className="text-2xl text-white font-bold bg-gradient-to-r from-blue-500 to-red-400 rounded-lg px-2 py-2">StaySavvy</div>
      <div className="text-sm font-light italic text-gray-600">Great choice 💕!!</div>
    </Link>
  
    <button
      onClick={toggleMenu}
      className="block md:hidden text-gray-600 focus:outline-none absolute top-4 right-6"
      aria-label="Toggle navigation">
      {menuOpen ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      )}
    </button>
  
    <nav className={`lg:flex items-center space-x-4 ${menuOpen ? 'block' : 'hidden'} md:flex`}>
      <Link className={linkClasses('bookings')} to={user ? '/account/bookings' : '/signin'}>
        Reservations <span role="img" aria-label="Reserved Stays">🔐</span>
      </Link>
      <Link className={linkClasses('places')} to={user ? '/account/places' : '/signin'}>
        Rentals <span role="img" aria-label="My Rentals">🏠</span>
      </Link>
      <Link
        to={user ? '/account' : '/signin'}
        className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-blue-600">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </Link>
      {!!user && (
        <div className="hidden lg:flex flex-col ml-2">
          <div className="text-blue-600 text-lg">{user.name}</div>
          <div className="text-gray-700 text-sm">welcome back !</div>
        </div>
      )}
    </nav>
  </header>  
  );
}

