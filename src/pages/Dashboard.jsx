import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
const Dashboard = () => {

const navigate = useNavigate()

useEffect(()=>{
    const userUid = localStorage.getItem("uid")
    if (!userUid) {
        navigate('/')
    }
    return
},[])


  return (
    <NavBar/>
  )

}

export default Dashboard