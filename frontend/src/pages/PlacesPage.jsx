import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks'
import axios from 'axios'

export default function PlacesPage() {
    const {action} = useParams()
    const [title,setTitle] = useState('')
    const [address,setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink,setPhotoLink ] = useState('')
    const [description,setDescription] = useState('')
    const [perks,setPerks] = useState([])
    const [extraInfo,setExtraInfo] = useState('')
    const [checkIn,setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [maxGuests,setMaxGuests] = useState(1)

    function inputHeader(text){
        return (
            <h2 className="text-lg font-medium text-gray-700">{text}</h2>
        )
    }
    function preInput(header){
        return(
            <div>
                {inputHeader(header)}
            </div>
        )
    }
    async function addPhotoByLink(ev){
        ev.preventDefault()
        const {data:filename}=await axios.post('/upload-by-link', {link:photoLink})
        setAddedPhotos(prev => {
            return [...prev,filename] 
        })
        setPhotoLink('')
    }
  return (
    <div>
        {action!== 'new' && (
            <div className="text-center font-serif mt-8">
            <Link className="inline-flex items-center py-2 px-2 bg-red-50  rounded-lg hover:bg-blue-400 hover:text-white transition duration-200 " to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                Add Place
            </Link>
            </div>
        )}
        {action === 'new' &&(
            <div className="flex-1 font-serif">
            <form className="flex flex-col gap-2">
              <div className="mt-2">
              {preInput('Title')}
                <input
                  type="text"
                  value ={title} 
                  onChange={ev => setTitle(ev.target.value)}
                  placeholder="Enter the title for your Guest House"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 block w-full"
                />
              </div>
              <div className="mt-2">
              {preInput('Address')}
                <input
                  type="text"
                  value ={address} 
                  onChange={ev => setAddress(ev.target.value)}
                  placeholder="Enter the address"
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 block w-full"
                />
              </div>
              <div className="mt-4">
               {preInput('Photos')}
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-md h-32 w-32 hover:bg-gray-50 transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-12 h-12 text-gray-400">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    <span className="ml-2 text-sm text-gray-600">Drag & drop or click to upload</span>
                    <input type="file" className="hidden" multiple />
                  </div>
                  <div className="flex flex-1 flex-col mt-2">
                    <label className="block text-sm font-medium text-gray-700">Or Enter an Image URL</label>
                    <div className="flex mt-1">
                      <input
                        type="text"
                        value ={photoLink} 
                        onChange={ev => setPhotoLink(ev.target.value)}
                        placeholder="Enter image URL"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 flex-1"
                      />
                      <button onClick={addPhotoByLink} className="ml-2 bg-blue-400 text-white py-2 px-3 rounded-md font-medium hover:bg-red-200 transition duration-200 hover:text-black">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" flex flex-wrap mt-2">
                    {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                        <div key={index} className="px-1 py-2 relative overflow-hidden">
                            <img
                                src={'http://localhost:3000/uploads/' + link}
                                alt=""
                                className="w-32 h-28  rounded-lg"
                            />
                        </div>
                    ))}
                </div>
              </div>
              <div className="mt-4">
                {preInput('Description')}
                <textarea
                  value ={description} 
                  onChange={ev => setDescription(ev.target.value)}
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
                  value ={extraInfo} 
                  onChange={ev => setExtraInfo(ev.target.value)}
                  placeholder="Enter house rules here..."
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 resize-none w-full"
                  rows="2"
                ></textarea>
              </div>
              <div className="mt-4">
                {preInput('Check-In & Check-Out Time')}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Check-In Time</label>
                    <input
                        type="text"
                        value ={checkIn} 
                        onChange={ev => setCheckIn(ev.target.value)}
                        placeholder="Enter check-in time"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 w-full"/>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Check-Out Time</label>
                    <input
                        type="text"
                        value ={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)}
                        placeholder="Enter check-out time"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 w-full"/>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Max Guests</label>
                    <input
                        type="number"
                        value ={maxGuests} 
                        onChange={ev => setMaxGuests(ev.target.value)}
                        placeholder="Enter max guests"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 w-full"/>
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
        )}
    </div>
  )
}