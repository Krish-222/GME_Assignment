// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage'
import Posts from './pages/Comments'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import ProtectRoutes from './ProtectRoute'
// import DifferentJobs from './pages/DifferentJobs'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route element={<ProtectRoutes/>}>
        <Route path="/posts" element={<Posts/>}></Route>
        {/* <Route path="/jobs-tree" element={<DifferentJobs/>}></Route> */}
        
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
