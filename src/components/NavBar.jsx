import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import blogspot from '../assets/blopspot.png'
import { NavLink, useNavigate } from 'react-router-dom';




const NavBar = () => {

  const Navigate = useNavigate()
  const logoutHandler = () =>{
    localStorage.setItem('uid','');
    Navigate('/')
    alert("Successfully Signed Out")
}
  const pages = [
  { name: 'Home', path: '/dashboard' },
  { name: 'My Blogs', path: '/myblogs' },
  { name: 'Create Blog', path: '/createblog' },
];
  const settings = [{name: 'My Profile', navTo: ()=>{} },{ name: 'Logout', navTo: logoutHandler}];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Left Logo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              style={{ filter: 'invert(1)', padding: '10px 10px', marginBottom: '4px' }}
              src={blogspot}
              width="195px"
              loading="lazy"
              alt="logo"
            />
          </Typography>

          {/* Mobile menu icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* ✅ Mobile nav links */}
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.path}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? 'black' : 'inherit',
                      fontWeight: isActive ? 'bold' : 'normal',
                      width: '100%',
                      textAlign: 'center',
                    })}
                  >
                    {page.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile logo */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              style={{ filter: 'invert(1)', padding: '10px 10px', marginBottom: '5px' }}
              className="img-fluid"
              src={blogspot}
              width="166vmin"
              loading="lazy"
              alt="logo"
            />
          </Typography>

          {/* ✅ Desktop nav links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.path}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'black' : 'white',
                  backgroundColor: isActive ? 'white' : 'transparent',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: isActive ? 'bold' : 'normal',
                  margin: '0 8px',
                })}
              >
                {page.name}
              </NavLink>
            ))}
          </Box>

          {/* User avatar & settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }} onClick={setting.navTo}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar