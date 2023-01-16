import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

function Profile() {
    const [mypics,setPics] = useState([]);
    const {state,dispatch} = useContext(UserContext);

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
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                   />
                 
               </div>
               <div>
                   <h4>{state?state.name:"loading"}</h4>
                   <h5></h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>40 posts</h6>
                       <h6>50 followers</h6>
                       <h6>20 following</h6>
                   </div>

               </div>
           </div>
        
            <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" />
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