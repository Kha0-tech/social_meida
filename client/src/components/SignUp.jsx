import { useRef, useState } from 'react'
import { Box, Container, TextField,Button, Typography, Alert } from '@mui/material'
import { userRegister } from '../apiCalls'
const SignUp = () => {
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const [status,setStatus] = useState(false);
  const [msg,setMsg] = useState("")
  
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
          e.preventDefault()
          const res=await userRegister(
            name.current.value,
            email.current.value,
            password.current.value
          )
          console.log(res.msg)
          if(res.msg){
            setStatus(!status)
            setMsg(res.msg)
          }
          
          
        }}
      >
        <Typography variant='h5' textAlign={"center"}>
            Sign Up
        </Typography>
        <TextField label="Name" size='small' fullWidth inputRef={name}/>
        <TextField label="Email" type={"email"} size='small' fullWidth inputRef={email}/>
        <TextField label="Password"type={"password"} size='small' fullWidth inputRef={password}/>
        <Button variant='contained' type='submit' sx={{width : 100}}>Sign Up</Button>
      </Box>
    </Container>
  )
}

export default SignUp