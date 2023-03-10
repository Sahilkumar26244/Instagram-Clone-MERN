import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';


function CreatePost() {
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    if(url)
    {
      fetch('https://instagram-clone-n5tk.onrender.com/posts/createpost',{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')

      },
      body:JSON.stringify({
        title,
        body,
        pic:url
      })
      }).then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.error){
          M.toast({html: data.error,classes:'#d50000 red accent-4'})
        }
        else{
          M.toast({html:'Created Post Succesfully!',classes:'#1de9b6 teal accent-3'})
          navigate('/')
        }
      }).catch(err => {
        console.log(err)
      })
    }
    
  },[url])

  const postDetails = () => {
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

  return (
    <div className='card input-field' 
    style={{margin:"100px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}
    >
        <input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type='text' placeholder='body' value={body} onChange={(e) => setBody(e.target.value)} />
        <div class="file-field input-field">
          <div className="btn">
            <span>Upload Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
        <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <button onClick={postDetails} className="btn waves-effect waves-light #1565c0 blue darken-3" >
            Submit Post
    </button>
    </div>
  )
}

export default CreatePost