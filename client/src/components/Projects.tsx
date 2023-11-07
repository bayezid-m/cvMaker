import { Box, Button, Card, Container } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import '../Styles/Projects.css'
import { Margin } from '@mui/icons-material';

const Projects = () => {
  return (
    <Container >
      <Card className='project_card' sx={{ borderRadius: '10px'}}>
        <div className='top_bar'>
          <AccountCircleIcon fontSize="large" />
          <div className='name_space'>
            <h2>John Doe</h2>
            <p>Software engineering student</p>
          </div>
        </div>
        <p>Welcome to the exciting world of web development! As a bachelor student embarking on a project in this dynamic field, you're about to delve into a realm where creativity and technology intersect. Web development is more than just coding....</p>
        <img src="https://elements-cover-images-0.imgix.net/b0ddb8bb-7e2b-4a75-8128-28f5917ea45e?auto=compress%2Cformat&fit=max&w=2038&s=9cb0f54643a88520676c528c5c1b6f67" alt="" height="350px" width="500px" style={{borderRadius: "10px"}}></img>
        <Button sx={{backgroundColor: "primary.contrastText", fontFamily: "Segoe UI", marginLeft:"30%", width: "200px"}}>Review</Button>
      </Card>
    </Container>
  )
}

export default Projects