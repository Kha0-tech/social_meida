import React from 'react'
import {Avatar, Box, Card, CardHeader, Container} from "@mui/material"
import { red } from '@mui/material/colors'
const Home = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <Card>
          <CardHeader 
            avatar={
              <Avatar sx={{bgColor : red[500]}}>S</Avatar>
            }
            title = "Name"
            subheader = "sub Header"
          />

        </Card>
      </Box>
    </Container>
  )
}

export default Home