import React, { Fragment, useState } from 'react'
import {AppBar, Avatar, Badge, Box, IconButton, InputBase, Menu, MenuItem, Paper, TextField, Toolbar, Typography} from "@mui/material"
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';

import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Outlet } from 'react-router-dom';


const Header = () => {
  const [open,setOpen] = useState(null)
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
            <AdbIcon fontSize='large' />
            <Typography 
              variant='h6'
              href='/'
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
            <IconButton>
              <Avatar/>
            </IconButton>
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
          
        </Toolbar>
      </AppBar>
      <Outlet/>
    </Fragment>
  )
}

export default Header