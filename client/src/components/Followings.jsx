import { Container,Box, Avatar, Button, Typography, Paper } from '@mui/material'
import { useLocation } from 'react-router-dom'
import FollowToggleButton from './FollowToggleButton';

const Followings = () => {
    const location = useLocation();
    const {users} = location.state
    console.log("following => ",users)
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
              <FollowToggleButton user={users}/>
            </Box>
        </Paper>
      ))}
        
    </Container >
  )
}

export default Followings