import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div>Dashboard</div>
  )
}

export default Dashboard