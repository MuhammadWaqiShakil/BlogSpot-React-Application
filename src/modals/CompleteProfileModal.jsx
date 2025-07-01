import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  IconButton,
  Container,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ToastAlert } from '../utils';

export default function CompleteProfileModal({ uid, onClose }) {
  const [bio, setBio] = useState('');
  const [socialFacebook, setSocialFacebook] = useState('');
  const [socialInstagram, setSocialInstagram] = useState('');
  const [socialLinkedIn, setSocialLinkedIn] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);


  const roles = [
  'Designer',
  'Blogger',
  'Programmer',
  'Writer',
  'Photographer',
  'Marketer',
  'Developer',
  'Content Creator',
  'UI/UX Expert',
  'Artist',
  'Editor',
  'Vlogger',
  'Entrepreneur',
  'Music Producer',
  'Podcaster',
  'Illustrator',
  'Data Analyst',
  'Tech Enthusiast',
  'Educator',
  'Influencer'
];


  const handleCloudinaryUpload = async (file) => {
    try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ReactImage");

    const res = await fetch("https://api.cloudinary.com/v1_1/dfl8sw998/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
    } catch (error) {
      ToastAlert({
        type:'error',
        message: error.message
      })
    }
    
  };

  const handleSave = async () => {
    try {
      setLoading(true);

    let avatarUrl = '';
    let coverUrl = '';

    if (avatarFile) avatarUrl = await handleCloudinaryUpload(avatarFile);
    if (coverFile) coverUrl = await handleCloudinaryUpload(coverFile);

    await updateDoc(doc(db, 'users', uid), {
      bio,
      socialLinks: { Facebook: socialFacebook, Instagram: socialInstagram, LinkedIn: socialLinkedIn },
      avatarUrl,
      coverUrl,
      role,
      isProfileComplete: true,
    });

    setLoading(false);
    ToastAlert({
      type:'success',
      message:'Profile Updated Successfully!'
    })
    onClose();
    } catch (error) {
      ToastAlert({
        type:'error',
        message: error.message
      })
    }
    
  };

  const handleCancel = async () =>{
    await updateDoc(doc(db, 'users', uid), {
      isProfileComplete: true,
    });
    onClose();
  }

  return (
    <Dialog open fullWidth maxWidth="md">
      <DialogContent sx={{ p: 1 }}>
        <Box sx={{ bgcolor: "#f3f4f6", minHeight: 680 }}>
          {/* Cover Photo */}
          <Box
            sx={{
              height: 270,
              backgroundImage: coverPreview
                ? `url(${coverPreview})`
                : "url(https://machwasco.co.ke/wp-content/themes/u-design/assets/images/placeholders/udesign_portfolio-placeholder.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "white",
                "&:hover": { bgcolor: "grey.200" },
              }}
            >
              <PhotoCamera />
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  setCoverFile(file);
                  setCoverPreview(URL.createObjectURL(file));
                }}
              />
            </IconButton>
          </Box>

          {/* Avatar + Form */}
          <Container sx={{ mt: -8, textAlign: "center" }}>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                src={
                  avatarPreview || "https://via.placeholder.com/150?text=Avatar"
                }
                sx={{
                  width: 120,
                  height: 120,
                  border: "4px solid white",
                }}
              />
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "white",
                  "&:hover": { bgcolor: "grey.200" },
                }}
              >
                <PhotoCamera fontSize="small" />
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setAvatarFile(file);
                    setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
              </IconButton>
            </Box>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="role-label">Select Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role-select"
                  value={role}
                  label="Select Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                color="dark"
                label="Your Bio"
                multiline
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                fullWidth
              />
              <TextField
                color="dark"
                label="Facebook Link"
                value={socialFacebook}
                onChange={(e) => setSocialFacebook(e.target.value)}
                fullWidth
              />
              <TextField
                color="dark"
                label="Instagram Link"
                value={socialInstagram}
                onChange={(e) => setSocialInstagram(e.target.value)}
                fullWidth
              />
              <TextField
                color="dark"
                label="LinkedIn Link"
                value={socialLinkedIn}
                onChange={(e) => setSocialLinkedIn(e.target.value)}
                fullWidth
              />
              <Button
                sx={{ backgroundColor: "black" }}
                variant="contained"
                onClick={handleSave}
                disabled={loading}
                fullWidth
              >
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Update Profile"
                )}
              </Button>
              <Button sx={{ color: "red" }} onClick={handleCancel} fullWidth>
                Cancel
              </Button>
            </Box>
          </Container>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
