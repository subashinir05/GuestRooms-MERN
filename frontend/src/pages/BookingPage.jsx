import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {differenceInCalendarDays, format} from "date-fns";
import PlaceImages from '../PlaceImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function BookingPage() {
  const {id} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    
    <div className="bg-gray-100 min-h-screen py-12 font-serif">
      {/* Signle Booking page*/}
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-medium mb-2 text-blue-600 flex items-center">
            {booking.place.title}
          </h1>
          <p className="text-gray-600 mb-3 flex items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-600" />
            {booking.place.address}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-medium mb-4">Booking Information</h2>
          <div className="text-lg font-semibold text-blue-600 mb-4">₹ {booking.price}</div>
          <div className="flex items-center mb-4 text-blue-600">
            <span className="material-icons text-gray-700 mr-2">Duration</span>
            {differenceInCalendarDays(new Date(booking.endDate), new Date(booking.startDate))} nights
          </div>
          <div className="flex items-center text-blue-600">
            <span className="material-icons text-gray-700 mr-2">Booking Period</span>
            {format(new Date(booking.startDate), 'dd MMM yyyy')} | {format(new Date(booking.endDate), 'dd MMM yyyy')}
          </div>
        </div>
      </div>
    </div>
  
    {/* Photos */}
    <div className="max-w-4xl mx-auto mt-8">
      <PlaceImages place={booking.place} />
    </div>
  </div>
  
  );
}

