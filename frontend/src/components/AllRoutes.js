import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreatePost from './screens/CreatePost'
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import SignUp from './screens/SignUp'

function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='create' element={<CreatePost/>} />
    </Routes>
  )
}

export default AllRoutes