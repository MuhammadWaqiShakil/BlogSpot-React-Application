import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Avatar,
  Typography,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Card,
  CardContent,
  Container,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Facebook,
  Twitter,
  YouTube,
  Instagram,
  People,
  Article,
  Favorite,
  LinkedIn,
  Edit,
  EditAttributes
} from '@mui/icons-material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastAlert } from '../utils';
import CompleteProfileModal from '../modals/CompleteProfileModal';

const Profile = () => {
  const navigate = useNavigate()
  const userUid = localStorage.getItem("uid")
  const [userData,setUserData] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [value,setValue] = useState(0)
  const [showModal,setShowModal] = useState(false)

useEffect(() => {
  if (!userUid) {
    navigate('/');
    return;
  }

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const docRef = doc(db, 'users', userUid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    } catch (error) {
      ToastAlert({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  fetchUser();
}, [userUid, navigate,showModal]);

const user = {
    name: `${userData?.firstName || ''} ${userData?.lastName || ''}`,
    email: userData?.email || '',
    role: userData?.role || '',
    avatar: userData?.avatarUrl || 'https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=',
    cover: userData?.coverUrl || 'https://machwasco.co.ke/wp-content/themes/u-design/assets/images/placeholders/udesign_portfolio-placeholder.jpg',
    posts: userData?.posts || 0,
    followers: userData?.followers?.length || 0,
    following: userData?.following?.length || 0,
    bio: userData?.bio || ''
  };



  return (
    <>
      <NavBar/>

  {
     isLoading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f3f4f6",
          }}
        >
          <CircularProgress size={170} color="inherit" />
        </Box>
      ) : (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f3f4f6" }}>
          {/* Header */}
          <Box
            sx={{
              height: 380,
              backgroundImage: `url(${user.cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <Container>
              <Avatar
                src={user.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  position: "absolute",
                  bottom: -60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  border: "4px solid white",
                }}
              />
            </Container>
          </Box>

          {/* Main Content */}
          <Container sx={{ mt: 10, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold">
              {user.name}
            </Typography>
            <Typography variant="h6" color="text.primary">
              {user.email}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {user.role}
            </Typography>

            {/* Social Icons */}
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" onClick={()=>{
                if(userData.socialLinks.Facebook){
                window.open(userData.socialLinks.Facebook,'_blank')
                }
              }}>
                <Facebook />
              </IconButton>
              <IconButton color="primary" onClick={()=>{
                if(userData.socialLinks.LinkedIn){
                window.open(userData.socialLinks.LinkedIn,'_blank')
                }
              }}>
                <LinkedIn />
              </IconButton>
              <IconButton color="secondary" onClick={()=>{
                if(userData.socialLinks.Instagram){
                window.open(userData.socialLinks.Instagram,'_blank')
                }
              }}>
                <Instagram />
              </IconButton>
            </Box>

            {/* Stats */}
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Typography fontWeight="bold">{user.posts}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Posts
                </Typography>
              </Grid>
              <Grid item>
                <Typography fontWeight="bold">{user.followers}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Followers
                </Typography>
              </Grid>
              <Grid item>
                <Typography fontWeight="bold">{user.following}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Following
                </Typography>
              </Grid>
            </Grid>

            {/* Tabs */}
            <Tabs value={value} centered sx={{ mt: 3 }}>
              <Tab icon={<Article />} label="Profile" onClick={()=>{
                setValue(0)
              }} />
              <Tab icon={<Favorite />} label="Followers" onClick={()=>{
                setValue(1)
              }} />
              <Tab icon={<People />} label="Following" onClick={()=>{
                setValue(2)
              }}/>
            </Tabs>

            {/* Bio Section */}
            <Grid container spacing={2} sx={{ mt: 3,pb:4 }} justifyContent="center">
              <Grid item xs={12} md={8}>
                {(value==0)?<>
                <Button variant='contained' sx={{backgroundColor:'black', mb:2}}> <Edit sx={{width: 25,mr:1}}/> Edit Profile </Button>
                <Card>
                  <CardContent sx={{mt:2, mb:2}}>
                    <Typography variant="h5">About</Typography>
                    <Typography variant="body1" sx={{mt:1}} color="text.secondary">
                      {user.bio}
                    </Typography>
                  </CardContent>
                </Card></>:(value==1)?<Card>
                  <CardContent sx={{mt:2, mb:2}}>
                    <Typography variant="h5">Followers</Typography>
                    {
                      user?.followers==0? <Typography sx={{width:'20rem', mt:5,mb:5}} variant="body2" color='text.secondary'>No Followers</Typography>:"Followers"
                    }
                  </CardContent>
                </Card>:(value==2)?<Card>
                  <CardContent sx={{mt:2, mb:2}}>
                    <Typography variant="h5">Following</Typography>
                    {
                      user?.following==0? <Typography sx={{width:'20rem', mt:5,mb:5}} variant="body2" color='text.secondary'>No Followings</Typography>:"Followers"
                    }
                  </CardContent>
                </Card>:"Not Found"}
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Profile