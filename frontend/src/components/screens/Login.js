import React, { useState ,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css';
import {UserContext} from '../../App'


function Login() {
  const {state,dispatch} = useContext(UserContext)
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const PostData = () => {
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           M.toast({html: 'Invalid Email!',classes:'#d50000 red accent-4'})
           return
      }
        fetch('http://localhost:5000/auth/signin',{
          method:'POST',
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify({
            email,
            password
          })
        }).then(res => res.json())
        .then(data => {
          console.log(data)
          if(data.error){
            M.toast({html: data.error,classes:'#d50000 red accent-4'})
          }
          else{
            localStorage.setItem('jwt',data.token);
            localStorage.setItem('user',JSON.stringify(data.user));
            dispatch({type:"USER",payload:data.user})
            M.toast({html:'SignedIn Successfully!',classes:'#1de9b6 teal accent-3'})
            navigate('/')
          }
        }).catch(err => {
          console.log(err)
        })
  }
  return (
    <div className='mycard' >
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={PostData} className="btn waves-effect waves-light #1565c0 blue darken-3" >
                Login
            </button>
            <h5>
                <Link to='/signup' >Don't have an account?</Link>
            </h5>
        </div>
    </div>
  )
}

export default Login