import React from 'react'

export default function Perks(selected, onChange) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 text-gray-600">
        <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>WiFi</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Parking</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Breakfast</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Daily Housekeeping</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Air Conditioning</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Kitchen Access</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Pet-Friendly</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Laundry Service</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Outdoor Space</span>
                  </label>
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-blue-400 rounded cursor-pointer" />
                    <span>Swimming Pool</span>
                  </label>
    </div>
  )
}
