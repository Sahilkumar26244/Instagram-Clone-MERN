import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='mycard' >
        <div className="card auth-card input-field">
            <h2>Instagram</h2>
            <input type='text' placeholder='name' />
            <input type='text' placeholder='email' />
            <input type='text' placeholder='password' />
            <button className="btn waves-effect waves-light #1565c0 blue darken-3" >
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