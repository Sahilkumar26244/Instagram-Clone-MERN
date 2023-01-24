import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import CreatePost from './screens/CreatePost'
import Home from './screens/Home'
import Login from './screens/Login'
import Newpassword from './screens/Newpassword'
import Profile from './screens/Profile'
import Reset from './screens/Reset'
import SignUp from './screens/SignUp'
import SubscribeUserPost from './screens/SubscribeUserPost'
import UserProfile from './screens/UserProfile'

function AllRoutes() {
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      navigate("/login")
    }
  },[])
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route exact path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/create' element={<CreatePost/>} />
        <Route path='/profile/:userid' element={<UserProfile/>} />
        <Route path='/subscribe' element={<SubscribeUserPost/>} />
        <Route exact path='/reset' element={<Reset/>} />
        <Route path='/reset/:token' element={<Newpassword/>} />
    </Routes>
  )
}

export default AllRoutes