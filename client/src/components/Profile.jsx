import { Avatar, Box, Button, ButtonGroup, Chip, Container, Stack, Typography } from '@mui/material'
import { useAuth } from '../AuthProvider';
import {useNavigate,useParams} from "react-router-dom"
import { useEffect, useState } from 'react';
import { getUser } from '../apiCalls';
import { Link } from 'react-router-dom';
const Profile = () => {
  const navigate = useNavigate()
  const {auth,authUser} = useAuth();
  const [user,setUser] = useState(authUser);
  const {handle} = useParams();

  useEffect(() => {
    (async() => {
      const update = await getUser(handle);
      if(update) setUser(update)
    })()  
  },[handle])

  return (
    <Container maxWidth="md">
        <Box>
            <Box sx={{height : 240,bgcolor : "gray"}}>
              
            </Box>
            <Box  
              sx={{
                height : 100,
                display : "flex",
                justifyContent :"space-between",
                alignItems : "center"
              }}
            
            >
              <Box sx={{marginLeft : 5}}>
                <Avatar 
                  alt="profile image" src='#'
                  sx={{
                    wdith : 56,
                    height : 56
                  }}
                />
                <Typography>{user.name}</Typography>
                <Typography>@{user.handle}</Typography>
              </Box>
              <Box 
                
                sx={{
                  display : "flex",
                  flexDirection : "column",
                  alignItems : "center",
                  justifyContent : "center"
                }}
              >
                {user._id === authUser._id ? (
                  <Button
                  variant='contained'
                  sx={{
                    textTransform : "inherit",
                    marginRight : 5,
                    height : 40,
                    
                  }}
                  onClick = {e => {
                    e.preventDefault();
                    navigate("/edit-profile")
                  }}
                >
                  Edit Profile
                </Button>
                ) : (
                  <Button/>
                )}
                
                <ButtonGroup variant='text' >
                  <Button
                    size='small'
                    sx={{
                      textTransform : "inherit",
                      color : "red"
                    }}
                    onClick ={() => {
                      navigate("/followers",{
                        state : {users : user.followers_users}
                      })
                    }}
                  >
                    Followers {user.followers_users && user.followers_users.length}
                  </Button>
                  <Button
                    size='small'
                    sx={{
                      textTransform : "inherit",
                      color : "red"
                    }}
                    onClick = {() => {
                      navigate("/followings",{
                        state : {users : user.following_users}
                      })
                    }}
                  >
                    Following {user.following_users && user.following_users.length}
                  </Button>
                  
                </ButtonGroup>
              </Box>
            </Box>
      </Box>
    </Container>
  )
}

export default Profile