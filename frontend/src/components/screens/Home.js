import React, { useEffect, useState } from 'react'

function Home() {
  const [data,setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/posts/allpost",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }).then(res => res.json())
    .then(result => {
      console.log(result)
      setData(result.posts)
    })
  },[])
  return (
    <div className='home' >
    {
      data.reverse().map(item => {
        return (
          <div className='card home-card' key={item._id} >
          <h5>{item.postedBy.name}</h5>
          <div className='card-image' >
              <img src={item.photo} />
          </div>
          <div className='card-content' >
              <i className="material-icons" style={{color:"red",cursor:"pointer"}} >favorite</i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type='text' placeholder='add a comment' />
          </div>
          </div>
        )}
      )
    }
        
    </div>  
  )
}

export default Home