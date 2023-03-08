import { useRef ,useState} from 'react'
import { Box, Container, TextField,Button, Typography, Alert } from '@mui/material';
import {useNavigate} from "react-router-dom"
import { userLogin, verify } from '../apiCalls';
import { useAuth } from '../AuthProvider';
const SignIn = () => {
  const {setAuthUser,setAuth} = useAuth()
  const email = useRef()
  const password = useRef()

  const [status,setStatus] = useState(false);
  const [msg,setMsg] = useState("")

  const navigate = useNavigate()
  return (
    <Container mx="auto" maxWidth="sm" >
        {status && <Alert severity="info" mt="2">{msg}</Alert>}
      <Box 
        sx={{
          display : "flex",
          flexDirection : "column",
          gap : 2,
          mt : 3
        }}
        component="form"
        onSubmit={async(e) => {
            e.preventDefault();
            const loginUser=await userLogin(
              email.current.value,
              password.current.value
            )
            if(loginUser.msg){
              setStatus(true);
              setMsg(loginUser.msg)
              return
            }
            if(loginUser){
              setAuth(true)
              const user = await verify()
              setAuthUser(user)
              navigate("/")
            }
           
        }}
      >
        <Typography variant='h5' textAlign={"center"}>
            Sign In
        </Typography>
        <TextField label="Email" type={"email"} size='small' fullWidth inputRef={email}/>
        <TextField label="Password"type={"password"} size='small' fullWidth inputRef={password}/>
        <Button variant='contained' type='submit' sx={{width : 100 ,textTransform: "inherit"}}>Sign In</Button>
      </Box>
    </Container>
  )
}

export default SignIn;