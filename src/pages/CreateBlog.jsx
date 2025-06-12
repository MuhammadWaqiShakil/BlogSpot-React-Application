import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import {
  Box,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
  CircularProgress
} from '@mui/material';
import {db} from '../firebase.js'
import { addDoc, collection } from 'firebase/firestore';
import { ToastAlert } from '../utils/index.js';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
     setLoading(true);
     if(title.length < 4 || description.length < 10){
        ToastAlert({
        type: 'error',
        message: "Write a valid blog (Spam Alert!)"
      });
        setLoading(false)
        return;
    }

    try {
      if(isPrivate==true){
      const obj = {
            title: title,
            desc: description,
            isPublic: false,
            isPrivate: true,
            uid: localStorage.getItem('uid')
        }
      await addDoc(collection(db, "privateBlogs"), obj);
      ToastAlert({
        type: 'success',
        message: 'Blog Successfully Created!'
      })
    }else{
      const obj = {
            title: title,
            desc: description,
            isPublic: true,
            isPrivate: false,
            uid: localStorage.getItem('uid')
        }
      await addDoc(collection(db, "publicBlogs"), obj);
      ToastAlert({
        type: 'success',
        message: 'Blog Successfully Created!'
      })
    }

    setTitle('')
    setDescription('')
    setIsPrivate(false)
    setImage(null)
    } catch (error) {
      ToastAlert({
        type: 'error',
        message: error.message
      })
    }finally {
    setLoading(false); 
  }
    
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 1,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            width: { xs: '100%', sm: '90%', md: '60%', lg: '45%' },
            maxWidth: '800px',
            bgcolor: 'white',
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            mt: -9,
          }}
        >
          <Stack spacing={2}>
            <Typography
              variant="h2"
              textAlign="center"
              fontWeight="500"
              sx={{ 
                color: 'black',
                letterSpacing: '-0.5px',
                mb: 1,
                pb: 3
              }}
            >
              Create a Blog
            </Typography>

            <TextField
              label="Blog Title"
              placeholder="Enter blog title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{ 
                style: { 
                  color: 'black',
                  fontSize: '1.1rem'
                } 
              }}
              InputLabelProps={{ 
                style: { 
                  color: 'rgba(0,0,0,0.7)',
                  fontSize: '1rem'
                } 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: 'rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease'
                  },
                  '&:hover fieldset': { 
                    borderColor: 'rgba(0,0,0,0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    borderWidth: '2px'
                  }
                },
              }}
            />

            <TextField
              label="Blog Description"
              placeholder="Write your blog..."
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{ 
                style: { 
                  color: 'black',
                  fontSize: '1.1rem'
                } 
              }}
              InputLabelProps={{ 
                style: { 
                  color: 'rgba(0,0,0,0.7)',
                  fontSize: '1rem'
                } 
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { 
                    borderColor: 'rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease'
                  },
                  '&:hover fieldset': { 
                    borderColor: 'rgba(0,0,0,0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                    borderWidth: '2px'
                  }
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  sx={{
                    color: 'rgba(0,0,0,0.6)',
                    '&.Mui-checked': {
                      color: 'black',
                    },
                  }}
                />
              }
              label="Make this blog private"
              sx={{ 
                color: 'rgba(0,0,0,0.8)',
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.95rem'
                }
              }}
            />

            <Button
              variant="outlined"
              component="label"
              startIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                    fill="currentColor"
                  />
                </svg>
              }
              sx={{
                color: 'black',
                borderColor: 'rgba(0,0,0,0.2)',
                borderWidth: '1.5px',
                py: 1.2,
                px: 3,
                fontSize: '0.95rem',
                fontWeight: 500,
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'black',
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderWidth: '1.5px',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                },
                '& .MuiButton-startIcon': {
                  marginRight: '8px',
                },
              }}
            >
              Choose Image
              <input hidden type="file" accept="image/*" onChange={handleImageChange} />
            </Button>

            {image && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(0,0,0,0.7)',
                  fontSize: '0.9rem'
                }}
              >
                Selected Image: {image.name}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                fontWeight: '600',
                textTransform: 'none',
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                '&:hover': {
                  backgroundColor: '#222',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Create"
              )}
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default CreateBlog;
