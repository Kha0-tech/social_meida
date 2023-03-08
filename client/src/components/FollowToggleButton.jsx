import { Box, Button } from '@mui/material'
import React from 'react'
import { useAuth } from '../AuthProvider'
import { followToggle } from '../apiCalls'
const FollowToggleButton = ({user}) => { 
    const {authUser,setAuthUser} = useAuth();
  return authUser.following && authUser.following.find(uid => uid === user._id) ? (
    <Button

        variant='contained'
        size='small'
        sx={{
            textTransform : "inherit"
        }}
        onClick={() => {
            (async() => {
                let result = await followToggle(user._id);
                authUser.following = result.following;
                setAuthUser({...authUser})
            })()
        }}
    >
        Followed
    </Button>
  ): (
    <Button
        variant='contained'
        size='small'
        sx={{
            textTransform : "inherit"
        }}
        onClick={() => {
            (async() => {
                let result = await followToggle(user._id);
                authUser.following = result.following;
                setAuthUser({...authUser})
                
            })()
        }}
    >
        Follow
    </Button>
  )
  
}

export default FollowToggleButton