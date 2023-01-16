import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css';

function SignUp() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [image,setImage] = useState("")
  const [url,setUrl] = useState(undefined)

  const navigate = useNavigate();

  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic = () => {
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","instagram-clone")
    data.append("cloud_name","dmzzzl5jj")
    fetch("https://api.cloudinary.com/v1_1/dmzzzl5jj/image/upload",{
      method:"post",
      body:data
    })
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      setUrl(data.url)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const uploadFields = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: 'Invalid Email!',classes:'#d50000 red accent-4'})
      return
      }
    fetch('https://instagram-clone-n5tk.onrender.com/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password,
        pic:url
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

  const PostData = () => {
    if(image){

      uploadPic()

    }else{

      uploadFields()
    }
      
  }

  return (
    <div className='mycard' >
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='text' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div class="file-field input-field">
              <div className="btn">
                <span>Upload Pic</span>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
            <button onClick={PostData} className="btn waves-effect waves-light #1565c0 blue darken-3" >
                SignUp
            </button>
            <h5>
                <Link to='/login' >Already have an account?</Link>
            </h5>
        </div>
    </div>
  )
}

export default SignUp