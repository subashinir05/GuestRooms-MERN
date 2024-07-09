import React from 'react'
import {Route, Routes} from "react-router-dom"
import IndexPage from './pages/IndexPage'
import SignIn from './pages/SignIn'
import Layout from './Layout'
import SignUp from './pages/SignUp'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Profile from './pages/Profile'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage />}></Route>
        <Route path="/signin" element={< SignIn/>}></Route>
        <Route path="/signup" element={< SignUp/>}></Route>
        <Route path="/account/" element={< Profile/>}></Route>
        <Route path="/account/places" element={< PlacesPage/>}></Route>
        <Route path="/account/places/new" element={<PlacesFormPage />}></Route>
        <Route path="/account/places/:id" element={<PlacesFormPage />}></Route>
        </Route>
        
      </Routes>
    </UserContextProvider>
   
  )
}

export default App