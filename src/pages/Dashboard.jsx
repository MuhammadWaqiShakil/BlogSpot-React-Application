import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import CompleteProfileModal from '../modals/CompleteProfileModal';
import blogspotHead from '../assets/blogspotHead.jpg'
import BlogCard from '../components/BlogCard'
import { Container, Grid } from '@mui/material'
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

const samplePosts = [
  {
    image: 'https://via.placeholder.com/600x300?text=Post+1',
    title: 'The Power of Consistency: How Small Daily Habits Lead to Big Results',
    subtitle: 'Muhammad Waqi',
    membersOnly: true,
  },
  {
    image: 'https://via.placeholder.com/600x300?text=Post+2',
    title: 'Designing for Emotion: How UI Impacts the User',
    subtitle: 'Sara Ali',
    membersOnly: false,
  },
  
  // Add more post objects as needed
];


  return (
    <>
    <NavBar/>
    <img src={blogspotHead} alt="" style={{width:'80%',marginLeft:'auto',marginRight:'auto',display:'block',marginTop:'10px'}}/>
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {samplePosts.map((post, index) => (
          <Grid item xs={12} md={6} key={index}>
            <BlogCard {...post} />
          </Grid>
        ))}
      </Grid>
    </Container>
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