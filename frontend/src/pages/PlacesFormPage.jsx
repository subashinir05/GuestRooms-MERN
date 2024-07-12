import React, { useEffect, useState } from 'react';
import PhotosUploader from '../PhotosUploader';
import Perks from '../Perks';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [price, setPrice] = useState(1000);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title || '');
      setAddress(data.address || '');
      setAddedPhotos(data.photos || []);
      setDescription(data.description || '');
      setPerks(data.perks || []);
      setExtraInfo(data.extraInfo || '');
      setPrice(data.price || 1000);
      setCheckIn(data.checkIn || '');
      setCheckOut(data.checkOut || '');
      setMaxGuests(data.maxGuests || '');
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-lg font-medium text-gray-700">{text}</h2>;
  }

  function preInput(header) {
    return (
      <div>
        {inputHeader(header)}
      </div>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      price,
      checkIn,
      checkOut,
      maxGuests
    };
    if (id) {
      await axios.put('/places', { id, ...placeData });
    } else {
      await axios.post('/places', placeData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <div>
      {/* Add Place */}
      <div className="flex-1 font-serif">
        <form className="flex flex-col gap-2" onSubmit={savePlace}>
          <div className="mt-2">
            {preInput('Title')}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Enter the title for your Guest House"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 block w-full"
            />
          </div>
          <div className="mt-2">
            {preInput('Address')}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="Enter the address"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 block w-full"
            />
          </div>
          <div className="mt-4">
            {preInput('Photos')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          </div>
          <div className="mt-4">
            {preInput('Description')}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="Enter description of the place"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 resize-none w-full"
              rows="4"
            ></textarea>
          </div>
          <div className="mt-4">
            {preInput('Perks')}
            <Perks selected={perks} onChange={setPerks} />
          </div>
          <div className="mt-4">
            {preInput('House Rules')}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
              placeholder="Enter house rules here..."
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 resize-none w-full"
              rows="2"
            ></textarea>
          </div>
          <div className="mt-4">
            {preInput('Price per day')}
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="Price per day"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 w-full"
            />
          </div>
          <div className="mt-4">
            {preInput('Check-In & Check-Out Time')}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-In Time</label>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="Enter check-in time"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-Out Time</label>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="Enter check-out time"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Guests</label>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                  placeholder="Enter max guests"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 w-full"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-400 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-500 transition duration-200">
            Add to Places
          </button>
        </form>
      </div>
    </div>
  );
}
