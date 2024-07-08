import axios from 'axios';
import React, { useState } from 'react';

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (photoLink.trim() === '') {
        alert('Please enter an image URL')
        return
      }
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
    onChange(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(response => {
      const { data: filenames } = response;
      onChange(prev => {
        return [...prev, ...filenames];
      });
    }).catch(error => {
        console.error('Error uploading photo:', error);
        alert('Failed to upload photo. Please try again.');
      });
  }

  return (
    <>
      <div className="mt-2 flex items-center space-x-4">
        <div className="flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-md h-32 w-32 hover:bg-gray-50 transition duration-300">
          <label className="cursor-pointer flex items-center">
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
            <input type="file" name="photos" multiple className="hidden" onChange={uploadPhoto} />
          </label>
        </div>
        <div className="flex flex-1 flex-col mt-2">
          <label className="block text-sm font-medium text-gray-700">Or Enter an Image URL</label>
          <div className="flex mt-1">
            <input
              type="text"
              value={photoLink}
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
      <div className="flex flex-wrap mt-2">
        {addedPhotos.length > 0 && addedPhotos.map(link => (
          <div key={link} className="px-1 py-2 relative overflow-hidden">
            <img
              src={'http://localhost:3000/uploads/' + link}
              alt=""
              className="w-32 h-28 rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
}
