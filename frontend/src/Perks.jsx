import React from 'react'

export default function Perks({selected,onChange}) {
  function handleCbClick(ev) {
    const {checked,name} = ev.target;
    if (checked) {
      onChange([...selected,name]);
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
  }
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 text-gray-600">
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="wifi" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick}  />
          <span>WiFi</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="parking" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Parking</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="breakfast" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Breakfast</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="daily housekeeping" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Daily Housekeeping</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="air conditioning" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Air Conditioning</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="kitchen access" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Kitchen Access</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="pet-friendly" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Pet-Friendly</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="laundry service" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Laundry Service</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="outdoor space" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Outdoor Space</span>
      </label>
      <label className="inline-flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" name="swimming pool" className="form-checkbox text-blue-400 rounded cursor-pointer" onChange={handleCbClick} />
          <span>Swimming Pool</span>
      </label>
</div>


  )
}
