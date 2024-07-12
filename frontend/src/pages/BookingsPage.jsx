// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PlaceImg from '../PlaceImg';
// import { differenceInCalendarDays, format } from 'date-fns';
// import { Link } from 'react-router-dom';

// export default function BookingsPage() {
//     const [bookings, setBookings] = useState([]);

//     useEffect(() => {
//         axios.get('/bookings')
//             .then(response => {
//                 setBookings(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching bookings:', error);
//             });
//     }, []);

//     return (
//         <div className="p-5 bg-gray-100 min-h-screen font-serif">
//             {/* Heading */}
//             <h1 className="text-2xl font-bold text-center text-blue-600 mb-10 mt-8">
//                 My Booking List
//             </h1>
//             {/* Conditional Rendering for Bookings */}
//             {bookings.length === 0 ? (
//                 <div className="text-center text-gray-600">
//                     <p>No bookings yet..</p>
//                 </div>
//             ) : (
//              // All Bookings
//              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-5">
//              {bookings.map(booking => (
//                  <Link to={`/account/bookings/${booking._id}`}
//                      key={booking._id}
//                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
//                      <div className="relative">
//                          <PlaceImg place={booking.place} className="w-full h-56 object-cover rounded-t-lg" />
//                          <div className="absolute top-0 right-0 bg-white text-red-500 px-1 py-1 m-1 rounded-md text-xs">
//                              Booked
//                          </div>
//                          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-3 w-full rounded-b-lg">
//                              <h3 className="text-lg font-medium">{booking.place.title}</h3>
//                          </div>
//                      </div>
//                      <div className="p-3 md:p-4">
//                          <div className="text-gray-700 mb-2">
//                              <span className="font-medium">Booking Period:</span>
//                              <span className="text-sm inline-block ml-1">
//                                  {format(new Date(booking.startDate), 'dd MMM yyyy')} | {format(new Date(booking.endDate), 'dd MMM yyyy')}
//                              </span>
//                          </div>
//                          <div className="text-gray-700 mb-2">
//                              <span className="block font-medium">Duration:</span>
//                              <span className="block text-sm">{differenceInCalendarDays(new Date(booking.endDate), new Date(booking.startDate))} Days</span>
//                          </div>
//                          <div className="text-blue-600 text-lg font-semibold">
//                              Total Price: ₹{booking.price}
//                          </div>
//                      </div>
//                  </Link>
//              ))}
//          </div>
//          )}
//     </div>            
//     );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        axios.get('/bookings')
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
            });
    };

    const handleDeleteBooking = (bookingId) => {
        axios.delete(`/bookings/${bookingId}`)
            .then(response => {
                console.log('Booking deleted successfully');
                fetchBookings(); // Refresh the list after deletion
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
            });
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen font-serif">
            {/* Heading */}
            <h1 className="text-2xl font-bold text-center text-blue-600 mb-10 mt-8">
                My Booking List
            </h1>
            {/* Conditional Rendering for Bookings */}
            {bookings.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>No bookings yet..</p>
                </div>
            ) : (
                // All Bookings
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-5">
                {bookings.map(booking => (
                  <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200 relative">
                    <Link to={`/account/bookings/${booking._id}`} className="block">
                      <div className="relative">
                        <PlaceImg place={booking.place} className="w-full h-56 object-cover rounded-t-lg" />
                        <div className="absolute top-0 right-0 bg-white text-red-500 px-1 py-1 m-1 rounded-md text-xs">
                          Booked
                        </div>
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-3 w-full rounded-b-lg">
                          <h3 className="text-lg font-medium">{booking.place.title}</h3>
                        </div>
                      </div>
                    </Link>
                    <div className="p-3 md:p-4">
                      <div className="text-gray-700 mb-2">
                        <span className="font-medium">Booking Period:</span>
                        <span className="text-sm inline-block ml-1">
                          {format(new Date(booking.startDate), 'dd MMM yyyy')} | {format(new Date(booking.endDate), 'dd MMM yyyy')}
                        </span>
                      </div>
                      <div className="text-gray-700 mb-2">
                        <span className="block font-medium">Duration:</span>
                        <span className="block text-sm">{differenceInCalendarDays(new Date(booking.endDate), new Date(booking.startDate))} Days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-blue-600 text-lg font-semibold">
                          Total Price: ₹{booking.price}
                        </div>
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="text-red-500 bg-white rounded-full p-1 hover:bg-red-100 transition duration-200"
                          aria-label="Delete Booking">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>              
            )}
        </div>
    );
}
