import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default function IndexPage() {
  const [places, setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then(response => {
    setPlaces(response.data)
    })
  })
  return (
    <div className="font-serif mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {places.length > 0 && places.map(place => (
      <div key={place.id} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          {place.photos?.[0] && (
            <img className="w-full h-60 object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt={place.title} />
          )}
          <div className="italic font-sans absolute top-0 right-0 bg-blue-500 text-slate-200 px-1 py-1 m-1 rounded-lg">
            <span className="text-lg font-medium">₹</span>
            <span className="text-xl font-medium">{place.price}</span>
            <span className="text-sm font-normal ml-1">/ Night</span>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{place.title}</h2>
          <h3 className="text-sm text-gray-600 mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1 text-blue-600" />
            {place.address}
          </h3>
        </div>
      </div>
    ))}
  </div>
   
  )
}

