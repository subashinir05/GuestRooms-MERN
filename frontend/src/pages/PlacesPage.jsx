import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import AccountNav from '../AccountNav'
import axios from 'axios'

export default function PlacesPage() {
  const[places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/user-places').then(({data}) => {
      setPlaces(data)
    })
  }, [])
  return (
    <div>
  <AccountNav />
  <div className="text-center mt-8">
    <Link
      to={'/account/places/new'}
      className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition duration-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-6 h-6 inline-block -mt-1 mr-2">
        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
      </svg>
      Add Place
    </Link>
  </div>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {places.length > 0 ? (
        places.map(place => (
          <Link to={'/account/places/' + place._id} key={place._id}>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
              {place.photos.length > 0 && (
                <img
                  src={'http://localhost:3000/uploads/' + place.photos[0]}
                  alt={place.title}
                  className="w-full h-60 object-cover object-center"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-500">{place.title}</h2>
                <p className="text-gray-600 line-clamp-3">{place.description}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-600">No places added yet.</p>
      )}
    </div>
  </div>
</div> 
  )
}