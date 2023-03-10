import { Container,Box, Avatar, Button, Typography, Paper } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import FollowToggleButton from './FollowUnfollowButton';
import { useAuth } from '../AuthProvider';
import { follow, unfollow } from '../apiCalls';
import FollowUnfollowButton from './FollowUnfollowButton';
const Followings = () => {
    const location = useLocation();
    const {users} = location.state
    const {auth,setAuth,authUser,setAuthUser} = useAuth()
  return (
    <Container maxWidth="md">
      <Typography variant='h5'>Followings  {users.length}</Typography>
      {users.map(user => (
        <Paper
          sx={{
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center",
            padding : 2,
            marginTop : 2
          }}
          key={user._id}
        >
            <Box
              sx={{
                display : 'flex',
                alignItems : "center",
                gap : 2
              }}
            >
              <Link to={`/@/${user.handle}`}>
                <Avatar alt='F'/>
              </Link>
              
              <Typography>
                {user.name} 
              </Typography>
            </Box>
            <Box>
              <FollowUnfollowButton user={user}/>
            </Box>
        </Paper>
      ))}
        
    </Container >
  )
}

export default Followings