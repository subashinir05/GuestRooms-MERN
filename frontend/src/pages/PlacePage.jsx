import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../UserContext';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);
  const [numberOfRooms, setNumberOfRooms] = useState(1);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfDays = 0;
  if (startDate && endDate) {
    numberOfDays = differenceInCalendarDays(new Date(endDate), new Date(startDate));
  }

  async function bookThisPlace() {
    if (numberOfRooms > 2 && numberOfDays > 14) {
      alert('For more than 2 rooms, the maximum booking duration is 14 days.');
      return;
    }

    const response = await axios.post('/bookings', {
      place: place._id,
      startDate,
      endDate,
      numberOfGuests,
      name,
      mobile,
      price: numberOfDays * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!place) {
    return null;
  }
  
  return (
    <div className="container mx-auto mt-8 p-4 font-serif">
      {/* Single Place page */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/4 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600">{place.title}</h2>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-600" />
            <p className="text-gray-600">{place.address}</p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {place.photos?.slice(0, 3).map((photo, index) => (
                <div key={index} className={`relative group overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
                  <img
                    src={`http://localhost:3000/uploads/${photo}`}
                    alt=""
                    className={`w-full h-full cursor-pointer object-cover rounded-lg transition duration-300 transform ${index === 0 ? "group-hover:scale-90" : ""}`}
                    style={{ aspectRatio: '16/9' }}
                    onClick={() => setShowAllPhotos(true)} 
                  />
                </div>
              ))}
            </div>
            {place.photos?.length > 3 && (
              <button
                onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition z-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
              </button>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mt-6 hover:text-red-400">About {place.title}</h3>
          <div className="mt-2 text-gray-700">{place.description}</div>
          <div className="flex justify-between items-center mt-4 p-4 border-t border-gray-200">
            <div className="text-gray-600">
              Check-in: {place.checkIn} pm | Check-out: {place.checkOut} am
            </div>
            <div className="px-2 py-1 rounded-md text-sm font-semibold">
              Max Guests: {place.maxGuests}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rules</h3>
            <ul className="list-disc pl-4 text-gray-700">
              {place.extraInfo?.split('.').map((point, index) => (
                <li key={index}>{point.trim()}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Perks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {place.perks?.map((perk, index) => (
                <div key={index} className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2 text-green-600" />
                  <span className="text-gray-700 font-medium">{perk.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Booking widget */}
        <div className="w-full lg:w-1/4 p-6 bg-gray-100 border-l border-gray-200 flex flex-col items-center">
          <div className="bg-gradient-to-r from-red-400 to-blue-400 text-white px-6 py-3 rounded-lg text-2xl font-semibold w-full mb-4 text-center shadow-lg">
            <span className="text-xl font-bold">₹</span>
            {place.price}
            <span className="text-lg ml-1">per night</span>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <div className="flex flex-col mb-4 w-full">
              <label className="text-sm text-gray-600 mb-1">Check-in Date</label>
              <input
                type="date"
                value={startDate}
                onChange={ev => setStartDate(ev.target.value)}
                className="p-2 border rounded-md w-full"
              />
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label className="text-sm text-gray-600 mb-1">Check-out Date</label>
              <input
                type="date"
                value={endDate}
                onChange={ev => setEndDate(ev.target.value)}
                className="p-2 border rounded-md w-full"
                min={startDate}
              />
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label className="text-sm text-gray-600 mb-1">Number of Guests</label>
              <input
                type="number"
                value={numberOfGuests}
                onChange={ev => setNumberOfGuests(ev.target.value)}
                className="p-2 border rounded-md w-full"
                min={1}
              />
            </div>
            <div className="flex flex-col mb-4 w-full">
              <label className="text-sm text-gray-600 mb-1">Number of Rooms</label>
              <input
                type="number"
                value={numberOfRooms}
                onChange={(ev) => setNumberOfRooms(ev.target.value)}
                className="p-2 border rounded-md w-full"
                min={1}
              />
              {numberOfRooms<=2 && numberOfDays >30 && (
                <p className="text-red-600 text-sm mt-2">
                The maximum booking duration is 30 days.
              </p>
              )}
              {numberOfRooms > 2 && (
                <p className="text-red-600 text-sm mt-2">
                  For more than 2 rooms, the maximum booking duration is 14 days.
                </p>
              )}
            </div>
            {startDate && endDate && (
              <div className="flex flex-col mb-4 w-full">
                <label className="text-sm text-gray-600 mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  className="p-2 border rounded-md w-full"
                />
                <label className="text-sm text-gray-600 mb-1">Contact Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(ev) => setMobile(ev.target.value)}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            )}
            <button
              onClick={bookThisPlace}
              className="bg-gradient-to-r from-red-400 to-blue-400 text-white px-4 py-2 rounded-md text-md font-medium hover:bg-gradient-to-l transition w-full shadow-lg">
              Book Now
              {startDate && endDate && (
                <span> - ₹ {numberOfDays * place.price}</span>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* All Photos */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center p-4 overflow-auto">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-4xl mt-12">
            <h2 className="text-4xl font-serif text-white mb-6 text-center">
              Photos of {place.title}
            </h2>
            <div className="grid grid-cols-1 gap-4 mt-8">
              {place?.photos?.length > 0 &&
                place.photos.map((photo, index) => (
                  <div key={index} className="w-full h-80 sm:h-96 md:h-112 lg:h-128">
                    <img
                      src={`http://localhost:3000/uploads/${photo}`}
                      alt=""
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
