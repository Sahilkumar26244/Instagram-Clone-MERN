import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

function Navbar() {
  const {state,dispatch} = useContext(UserContext);
  const navigate = useNavigate()

  const renderList = () => {
    
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li>
          <button onClick={() => {
            localStorage.clear()
            dispatch({type:"CLEAR"})
            navigate('/login')
          }} className="btn waves-effect waves-light #f44336 red" >
            LogOut
          </button>
        </li>,
        <li><Link to="/subscribe">Following Post</Link></li>
      ]
    }
    else{
      return [
        <li><Link to='/login'>Login</Link></li>,
        <li><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
  return (
    <>
    <nav>
        <div className="nav-wrapper white" >
            <Link to={state?"/":"/login"} className="brand-logo left">Instagram</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
        </div>
    </nav>
    </>
    
  )
}

export default Navbar