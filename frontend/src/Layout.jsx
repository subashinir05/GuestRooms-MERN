import React from 'react'
import Headers from './Headers'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="p-3">
        <Headers />
        <Outlet/>
    </div>
  )
}
