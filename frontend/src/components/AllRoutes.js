import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import CreatePost from './screens/CreatePost'
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import SignUp from './screens/SignUp'

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
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='create' element={<CreatePost/>} />
    </Routes>
  )
}

export default AllRoutes