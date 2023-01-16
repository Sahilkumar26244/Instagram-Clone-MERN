import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

function Profile() {
    const [mypics,setPics] = useState([]);
    const {state,dispatch} = useContext(UserContext);

    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        fetch('http://localhost:5000/posts/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result)
            setPics(result.mypost)
        })
    },[])

    useEffect(()=>{
        if(image){
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
                    localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
                    dispatch({type:"UPDATEPIC",payload:data.url})
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },[image])

    const updatePic = (file) => {
        setImage(file)
        
    }
  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
           <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               <div>
                   <img style={{width:"100%",height:"160px",width:"160px",borderRadius:"80px"}}
                   src={state?state.pic:"loading"}
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5>{state?state.email:"loading"}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{mypics.length} posts</h6>
                       <h6>{state?state.followers.length:"loading"} followers</h6>
                       <h6>{state?state.following.length:"loading"} following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e) => updatePic(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>      
           <div className="gallery">
               {
                mypics.reverse().map(item=>{
                    return (
                        <img key={item._id} className='item' src={item.photo} alt={item.title} />
                    )
                })
               }
           </div>
       </div>
  )
}

export default Profile