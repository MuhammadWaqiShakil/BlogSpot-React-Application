import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>} />
    </Routes>
    </>
  )
}

export default App
