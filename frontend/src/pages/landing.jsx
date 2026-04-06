import React from 'react'
import "../App.css"

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
        <div role='button'>Get Started</div>
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
