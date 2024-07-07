import React from 'react'
import {Route, Routes} from "react-router-dom"
import IndexPage from './pages/IndexPage'
import SignIn from './pages/SignIn'
import Layout from './Layout'
import SignUp from './pages/SignUp'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'

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
        <Route path="/account/:subpage?" element={< Account/>}></Route>
        <Route path="/account/:subpage/:action" element={< Account/>}></Route>
        </Route>
        
      </Routes>
    </UserContextProvider>
   
  )
}

export default App