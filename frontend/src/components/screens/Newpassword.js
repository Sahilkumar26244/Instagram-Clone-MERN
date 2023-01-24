import React, { useState ,useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import M from 'materialize-css';



function Newpassword() {
  
  const {token} = useParams()
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const PostData = () => {
        fetch(`https://instagram-clone-n5tk.onrender.com/auth/new-password`,{
          method:'POST',
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify({
            password,
            token
          })
        }).then(res => res.json())
        .then(data => {
          console.log(data)
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
            <input type='password' placeholder='Enter a new Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={PostData} className="btn waves-effect waves-light #1565c0 blue darken-3" >
                Update Password
            </button>
        </div>
    </div>
  )
}

export default Newpassword