import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import CompleteProfileModal from '../modals/CompleteProfileModal';
const Dashboard = () => {

const navigate = useNavigate()
const [showModal,setShowModal] = useState(false)
const [userData,setUserData] = useState(null)
const userUid = localStorage.getItem("uid")

useEffect(()=>{
    
    if (!userUid) {
        navigate('/')
        return
    }

    const fetchUser = async ()=>{
      const docRef = doc(db,'users',userUid)
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setUserData(docSnap.data());
        if(!docSnap.data().isProfileComplete){
          setShowModal(true)
        }
      }
    }

    if(userUid){
      fetchUser()
    }
    
},[userUid])


  return (
    <>
    <NavBar/>
    <h1 style={{textAlign:'center',marginTop:'25px'}}>Welcome to Dashboard</h1>
      {showModal && userData && (
        <CompleteProfileModal
          uid={userUid}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
    
  )

}

export default Dashboard