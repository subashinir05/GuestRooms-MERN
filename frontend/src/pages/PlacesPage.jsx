// import React, { useEffect, useState } from 'react'
// import { Link} from 'react-router-dom'
// import axios from 'axios'
// import PlaceImg from '../PlaceImg'

// export default function PlacesPage() {
//   const[places, setPlaces] = useState([])
//   useEffect(() => {
//     axios.get('/user-places').then(({data}) => {
//       setPlaces(data)
//     })
//   }, [])
//   return (
//     <div>
//   <div className="text-center mt-8 font-serif">
//     <Link
//       to={'/account/places/new'}
//       className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition duration-200">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//         className="w-6 h-6 inline-block -mt-1 mr-2">
//         <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
//       </svg>
//       Add Place
//     </Link>
//   </div>
//   {/* All added places */}
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 font-serif">
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//       {places.length > 0 ? (
//         places.map(place => (
//           <Link to={'/account/places/' + place._id} key={place._id}>
//             <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
//               <PlaceImg place={place} />
//               <div className="p-6">
//                 <h2 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-500">{place.title}</h2>
//                 <p className="text-gray-600 line-clamp-3">{place.description}</p>
//               </div>
//             </div>
//           </Link>
//         ))
//       ) : (
//         <div className="text-center text-gray-600">
//             <p>No places added yet..</p>
//         </div>
//       )}
//     </div>
//   </div>
// </div> 
//   )
// }

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PlaceImg from '../PlaceImg';

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  // Function to handle deletion of a place
  const handleDeletePlace = (id) => {
    axios.delete(`/places/${id}`)
      .then(() => {
        // Filter out the deleted place from the state
        setPlaces(places.filter(place => place._id !== id));
      })
      .catch(error => {
        console.error('Error deleting place:', error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 font-serif">
  <div className="text-center">
    <Link
      to={'/account/places/new'}
      className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg transition duration-200">
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

  {/* All added places */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
    {places.length > 0 ? (
      places.map(place => (
        <div key={place._id} className="relative bg-white rounded-xl overflow-hidden shadow-lg">
          <PlaceImg place={place} />
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-500">{place.title}</h2>
            <div className="flex space-x-2">
              <Link
                to={`/account/places/${place._id}`}
                className="text-blue-500 rounded-full p-2 hover:bg-blue-100 transition duration-200"
                aria-label="Edit Place">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </Link>
              <button
                onClick={() => handleDeletePlace(place._id)}
                className="text-red-500 rounded-full p-2 hover:bg-red-100 transition duration-200"
                aria-label="Delete Place">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-600">
        <p>No places added yet..</p>
      </div>
    )}
  </div>
</div>

  );
}
