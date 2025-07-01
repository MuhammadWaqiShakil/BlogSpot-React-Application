import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import {Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import MyBlogs from './pages/MyBlogs'
import CreateBlog from './pages/CreateBlog'
import { Bounce, ToastContainer } from 'react-toastify'
import Profile from './pages/profile'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/myblogs' element={<MyBlogs/>} /> 
      <Route path='/createblog' element={<CreateBlog/>} /> 
      <Route path='/profile' element={<Profile/>} /> 
    </Routes>


    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>


  )
}

export default App
