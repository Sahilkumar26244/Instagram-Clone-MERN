import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

function Home() {

  const [data,setData] = useState([]);
  const {state,dispatch} = useContext(UserContext);


  useEffect(() => {
    fetch("https://instagram-clone-n5tk.onrender.com/posts/allpost",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log("jj",result)
      setData(result.posts)
    })
  },[])

  const likePost = (id) => {
      fetch('https://instagram-clone-n5tk.onrender.com/posts/like',{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
          postId:id
        })
      }).then(res => res.json())
      .then(result => {
        // console.log(result,"sad")
        const newData = data.map(item => {
          if(item._id == result._id){
            return result
          }
          else{
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const unlikePost = (id) => {
      fetch('https://instagram-clone-n5tk.onrender.com/posts/unlike',{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        },
        body:JSON.stringify({
          postId:id
        })
      }).then(res => res.json())
      .then(result => {
        // console.log(result)
        const newData = data.map(item => {
          if(item._id == result._id){
            return result
          }
          else{
            return item
          }
        })
        setData(newData)
      }).catch(err => {
        console.log(err)
      })
  }

  const makeComment = (text,postId) => {
    fetch('https://instagram-clone-n5tk.onrender.com/posts/comment',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId:postId,
        text:text
      })
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      const newData = data.map(item => {
        if(item._id == result._id){
          return result
        }
        else{
          return item
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const deletepost = (postId) => {
    fetch(`https://instagram-clone-n5tk.onrender.com/posts/deletepost/${postId}`,{
      method:"delete",
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      // console.log(result)
      const newData = data.filter(item=>{
        return item._id !== result._id
      })
      setData(newData)
    })
  }

  return (
    <div className='home' >
    {
      data?.map(item => {
        return (
          <div className='card home-card' key={item._id} >
          <h5>
           <Link to={item.postedBy._id !== state._id ? '/profile/'+item.postedBy._id:"/profile"} >
            {item.postedBy.name}
           </Link> 
              {item.postedBy._id == state._id
                && 
                <div style={{display:"flex",float:"right",gap:"20px"}} >
                <i className="material-icons" style={{color:"red",cursor:"pointer",float:"right"}} onClick={() => deletepost(item._id)} >delete</i>
                <i class="material-icons" style={{color:"red",cursor:"pointer",float:"right"}} >create</i>
                </div>
                
              } 
          </h5>
          <div className='card-image' >
              <img src={item.photo} />
          </div>
          <div className='card-content' >
              <i className="material-icons" style={{color:"red",cursor:"pointer"}} >favorite</i>
              {item.likes.includes(state._id)
                ?<i className="material-icons" onClick={() => unlikePost(item._id)} style={{cursor:"pointer"}} >thumb_down</i>
                :<i className="material-icons" onClick={() => likePost(item._id)} style={{cursor:"pointer"}} >thumb_up</i>
              }
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record => {
                  return (
                    
                    <h6 key={record._id} ><span style={{fontWeight:"bolder"}} >{record.postedBy.name} </span>{record.text}</h6>
                    
                  )
                })
              }
              <form onSubmit={(e) => {
                  e.preventDefault()
                  makeComment(e.target[0].value,item._id)
                }} >
                  <input type='text' placeholder='add a comment' />
              </form>
              
          </div>
          </div>
        )}
      )
    }
        
    </div>  
  )
}

export default Home