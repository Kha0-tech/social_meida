import React from 'react'
import {Avatar, Box, Card, CardContent, CardHeader, Container} from "@mui/material"
import { red } from '@mui/material/colors'
const Home = () => {
  return (
    <Container maxWidth="md">
      <Box>
        <Card sx={{mt : 2}}>
          <CardHeader 
            avatar={
              <Avatar sx={{bgColor : red[500]}}>S</Avatar>
            }
            title = "Name"
            subheader = "sub Header"
          />
          <CardContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, quae et delectus repellat minus, error amet fugit sequi animi voluptatem illum iure quo, iusto ut minima ullam eveniet aperiam ipsum.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus est ipsam excepturi earum deserunt nisi nulla cum? Molestias nobis saepe inventore temporibus ea, at necessitatibus sed adipisci laborum soluta ipsa?
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default Home