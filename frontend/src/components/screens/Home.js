import React from 'react'

function Home() {
  return (
    <div className='home' >
        <div className='card home-card' >
            <h5>ramesh</h5>
            <div className='card-image' >
                <img src='https://images.unsplash.com/photo-1670272504471-61a632484750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' />
            </div>
            <div className='card-content' >
                <i className="material-icons" style={{color:"red"}} >favorite</i>
                <h6>Title</h6>
                <p>This is a amazing </p>
                <input type='text' placeholder='add a comment' />
            </div>
        </div>
    </div>  
  )
}

export default Home