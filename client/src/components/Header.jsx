import React, { Fragment, useState } from 'react'
import {
  AppBar,
  Avatar, 
  Badge, 
  Box, Button,
  IconButton,
  InputBase, 
  Menu, MenuItem, 
  Paper, 
  TextField,
  Toolbar, 
  Typography,
  Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText 
} from "@mui/material"
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';



const Header = () => {
  const navigate = useNavigate()
  const [anchorEl,setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => setAnchorEl(null)
  const {auth,setAuth,authUser,setAuthUser} =useAuth()
  
  return (
    <Fragment>
      <AppBar position='sticky'>
        <Toolbar
          sx={{
            display : "flex",
            justifyContent : "space-between"
          }}
        >
          <Box
            sx={{
              display : "flex",
              alignItems : "center"
            }}
          >
            <AdbIcon 
              onClick={() => {
                navigate("/")
              }} 
              fontSize='large' 
            />
            <Typography 
              variant='h6'
              onClick={() => {
                navigate("/")
              }} 
              color= "inherit"
              sx={{
                ml : 2,
                display : {xs : "none",md:'flex'}
              }}
              >
              My App
            </Typography>
          </Box>
          <Paper 
            sx={{
              width:"40%",
              display : "flex",
              alignItems :"center"
            }}
            component="form"
          >
            <InputBase size='small' placeholder='Search ...' fullWidth sx={{ml : 1}}/>
            <IconButton>
              <SearchIcon/>
            </IconButton>
          </Paper>
          {auth === true ? (
            <Box>
              <Box 
                sx={{
                  display : {xs : "none" ,md : "flex"}
              }}  
              >
                <IconButton size='large'>
                  <Badge badgeContent={5} color="error">
                    <MailIcon/>
                  </Badge>
                </IconButton>
                <IconButton size='large'>
                  <Badge badgeContent={5} color="error">
                    <NotificationsIcon/>
                  </Badge>
                </IconButton>
                <IconButton

                  onClick={handleClick}
                >
                  <Avatar/>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem 
                    onClick={(e) => {
                      handleClose()
                      e.preventDefault()
                      navigate(`/@/${authUser.handle}`)
                    }}
                  >Profile</MenuItem>
                  <MenuItem onClick={() => {
                    handleClose()
                    setAuth(false)
                    setAuthUser(null)
                    localStorage.removeItem("token")
                    navigate("/")
                  }}>Logout</MenuItem>
                </Menu>
              </Box>
              <Box
                  sx={{
                    display : {xs : "flex",md :"none"}
                  }}
                >
                <IconButton size='large' color='inherit'>
                  <MoreIcon/>
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box>
              <Button onClick={e => {
                e.preventDefault();
                navigate("/sign-in")
              }} variant='text' sx={{color : "white",textTransform : "inherit"}}>
                Sign In
              </Button>
            
              <Button onClick={e => {
                e.preventDefault();
                navigate("/sign-up")
              }} variant='text' sx={{color : "white",textTransform : "inherit"}}>
                Sign Up
              </Button>
            </Box>
          )}
          
          
        </Toolbar>
      </AppBar>
      
    </Fragment>
  )
}

export default Header