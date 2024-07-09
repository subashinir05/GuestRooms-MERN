import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import AccountNav from '../AccountNav'
import axios from 'axios'

export default function PlacesPage() {
  const[places, setPlaces] = useState([])
  const [expandedPlace, setExpandedPlace] = useState(null);

  const toggleExpand = (placeId) => {
    if (expandedPlace === placeId) {
      setExpandedPlace(null); // Close the expanded view if clicking the same place again
    } else {
      setExpandedPlace(placeId); // Expand the clicked place
    }
  };
  useEffect(() => {
    axios.get('/places').then(({data}) => {
      setPlaces(data)
    })
  }, [])
  return (
    <div>
      <AccountNav />

      {/* Container for the "Add Place" button */}
      <div className="text-center font-serif mt-8">
        <Link
          to={'/account/places/new'}
          className="inline-flex items-center py-2 px-2 bg-red-50 rounded-lg hover:bg-blue-400 hover:text-white transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
          </svg>
          Add Place
        </Link>
      </div>

      {/* Container for the list of places */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {places.length > 0 ? (
            places.map(place => (
              <Link to={'/account/places/' + place._id} key={place._id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
                  {place.photos.length > 0 && (
                    <img
                      src={'http://localhost:3000/uploads/' + place.photos[0]}
                      alt={place.title}
                      className="w-full h-48 object-cover object-center"
                    />
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{place.title}</h2>
                    <p className="text-gray-600">{place.description}</p>
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