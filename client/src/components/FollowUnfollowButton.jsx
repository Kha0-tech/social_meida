
import { Box, Button } from '@mui/material'
import React from 'react'
import { useAuth } from '../AuthProvider'
import { follow,unfollow } from '../apiCalls'
const FollowUnfollowButton = ({user}) => { 
    const {authUser,setAuthUser} = useAuth();
  return authUser.following && authUser.following.find(uid => uid.toString() === user._id.toString()) ? (
    <Button

        variant='contained'
        size='small'
        sx={{
            textTransform : "inherit"
        }}
        onClick={() => {
            (async() => {
                let result = await follow(user._id);
                authUser.following = result.following;
                console.log("authuser unfollow =>",authUser.following ,authUser.following.length)
                setAuthUser({...authUser})
            })()
        }}
    >
        Unfollow
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
                let result = await follow(user._id);
                console.log("authuser follow =>",authUser.followers , authUser.followers.length)
                authUser.followers = result.followers;
                setAuthUser({...authUser})
                
            })()
        }}
    >
        Follow
    </Button>
  )
  
}

export default FollowUnfollowButton

