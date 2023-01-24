import React, { useState ,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css';



function Reset() {

  
  const [email,setEmail] = useState("");
  

  const navigate = useNavigate();

  const PostData = () => {
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           M.toast({html: 'Invalid Email!',classes:'#d50000 red accent-4'})
           return
      }
        fetch('https://instagram-clone-n5tk.onrender.com/auth/reset-password',{
          method:'POST',
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify({
            email
          })
        }).then(res => res.json())
        .then(data => {
          
          if(data.error){
            M.toast({html: data.error,classes:'#d50000 red accent-4'})
          }
          else{
            M.toast({html:data.message,classes:'#1de9b6 teal accent-3'})
            navigate('/login')
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
            <button onClick={PostData} className="btn waves-effect waves-light #1565c0 blue darken-3" >
                Reset Password
            </button>
        </div>
    </div>
  )
}

export default Reset