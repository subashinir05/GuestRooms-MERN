
import {useState} from "react";

export default function PlaceImages({place}) {

  const [showAllPhotos,setShowAllPhotos] = useState(false);

  const toggleShowAllPhotos = () => {
    setShowAllPhotos(!showAllPhotos);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {place.photos?.slice(0, 3).map((photo, index) => (
          <div key={index} className={`relative group overflow-hidden ${index === 0 ? "col-span-2 row-span-2" : ""}`}>
            <img
              src={`http://localhost:3000/uploads/${photo}`}
              alt=""
              className={`w-full h-full cursor-pointer object-cover rounded-lg transition duration-300 transform ${index === 0 ? "group-hover:scale-90" : ""}`}
              style={{ aspectRatio: '16/9' }}
              onClick={() => setShowAllPhotos(true)} // Clicking on image opens full photos
            />
          </div>
        ))}
      </div>
      {place.photos?.length > 3 && (
        <button
          onClick={toggleShowAllPhotos}
          className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </button>
      )}
      
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center p-4 overflow-auto">
          <button 
            onClick={toggleShowAllPhotos} 
            className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-4xl mt-12">
            <h2 className="text-4xl font-serif text-white mb-6 text-center">Photos of {place.title}</h2>
            <div className="grid grid-cols-1 gap-4 mt-8">
              {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                <div key={index} className="w-full h-80 sm:h-96 md:h-112 lg:h-128">
                  <img src={`http://localhost:3000/uploads/${photo}`} alt="" className="w-full h-full object-cover rounded-lg shadow-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
