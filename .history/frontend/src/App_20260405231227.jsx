import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import <LandingPage></LandingPage> from './pages/landing'

const App = () => {
  return (
  <>

<Router>
  <Routes>
    <Route path="/" element={<lan />} />
  </Routes>
</Router>

  </>
  )
}

export default App
