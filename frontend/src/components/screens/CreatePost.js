import React from 'react'

function CreatePost() {
  return (
    <div className='card input-field' 
    style={{margin:"100px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}}
    >
        <input type='text' placeholder='title' />
        <input type='text' placeholder='body' />
        <div class="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file"/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" />
      </div>
    </div>
    <button className="btn waves-effect waves-light #1565c0 blue darken-3" >
            Submit Post
    </button>
    </div>
  )
}

export default CreatePost