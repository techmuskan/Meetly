import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom'

const landing = () => {
  return (<>
  <div className="landingPageContainer">
    <nav>
      <div className="navHeader">
        <h2>SyncView</h2>
      </div>
      <div className="navList">
        <p>Join as Guest</p>
        <p>Register</p>
        <div role='button'>
          <p>Login</p>
        </div>  
      </div>
    </nav>
    <div className="mainContent">
      <div className="mainLeft">
        <h2><span>Connect</span> with your</h2>
        <h2>Loved Ones</h2>
        <p>Cover a distance by SyncView</p>
        <div>
          <Link role='button' to="/auth">Get Started</Link>
        </div>
      </div>
      <div className="mainRight">
        <img src="../public/right.jpg" alt="" />
      </div>
    </div>
  </div>
  </>
  )
}

export default landing
