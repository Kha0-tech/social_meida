import { Container,Box, Avatar, Button, Typography, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { followToggle } from '../apiCalls';
import { useAuth } from '../AuthProvider';
import FollowToggleButton from './FollowToggleButton';
const Followers = () => {
    const location = useLocation();
    const {users} = location.state
    const {auth,authUser,setAuthUser} = useAuth()
  return (
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
              <Avatar alt='F'/>
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
  )
}

export default Followers