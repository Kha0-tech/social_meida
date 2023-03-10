import { Container,Box, Avatar, Button, Typography, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { getUser } from '../apiCalls';
import { useAuth } from '../AuthProvider';
import FollowToggleButton from './FollowUnfollowButton';
import { Link } from 'react-router-dom';
const Followers = () => {
  const location = useLocation();
  const {users} = location.state;
  console.log("users follower => ",users)
  console.log("followers usres =>",users)
  const {auth,setAuth,authUser,setAuthUser} = useAuth()
  return ( auth && authUser ? (
    <Container maxWidth="md">
      <Typography variant='h5'>Followers  {users.length}</Typography>
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
              <FollowToggleButton user={user}/>          
            </Box>
        </Paper>
      ))}
        
    </Container >
  ) : (
    <Container maxWidth="md">
      <Typography>You can login and register</Typography>
      
    </Container>
  )
    
  )
}

export default Followers