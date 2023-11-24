import { Box, Button, Card, Container } from '@mui/material'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { addNewProject, getAllProject } from '../redux/reducers/ProjectReducer';
import '../Styles/Projects.css'
import { Margin } from '@mui/icons-material';
import { Project } from '../types/Project';
import { useDispatch } from 'react-redux';
import { getUserByEmail } from '../redux/reducers/UserReducer';



interface ProjectCardProps {
  project: Project;
}

interface EmailDisplayProps {
  email: string;
}

// const EmailDisplay: React.FC<EmailDisplayProps> = ({ email }) => {
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(getUserByEmail({ email:email }))
//   }, [email])
//   const { emailUser } = useAppSelector(state => state.userReducer);
//   console.log(emailUser);
//   return (
//     <div className='profileInfo'>
//       <img src={imageUrl + emailUser.image} alt={emailUser.email} height="30px" width="30px" style={{ borderRadius: "10px" }} />
//       <p >{emailUser.first_name} {emailUser.last_name}</p>
//     </div>
//   );
// };

// const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/"
// const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
//   <Card className='project_card' sx={{ borderRadius: '10px' }}>
//     <div className='top_bar'>
//       <div className='name_space'>
//         <EmailDisplay email={project.email} />
//         <h2>{project.name}</h2>
//         <p>{project.email}</p>
//         <p>{project.description}</p>
//       </div>
//     </div>
//     <img src={imageUrl + project.image} alt={project.name} height="350px" width="500px" style={{ borderRadius: "10px" }} />
//     <Button sx={{ backgroundColor: "primary.contrastText", fontFamily: "Segoe UI", marginLeft: "30%", width: "200px" }}>Review</Button>
//   </Card>
// );

const CombinedCard: React.FC<ProjectCardProps> = ({ project }) => {
  const dispatch = useAppDispatch();
  const { emailUser } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getUserByEmail({ email: project.email }));
  }, [project.email]);

  const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/";

  return (
    <Card className='project_card' sx={{ borderRadius: '10px' }}>
      <div className='top_bar'>
        <div className='name_space'>
          <div className='profileInfo'>
            <img src={imageUrl + emailUser.image} alt={emailUser.email} height="30px" width="30px" style={{ borderRadius: "10px" }} />
            <p>{emailUser.first_name} {emailUser.last_name}</p>
          </div>
          <h2>{project.name}</h2>
          <p>{project.email}</p>
          <p>{project.description}</p>
        </div>
      </div>
      <img src={imageUrl + project.image} alt={project.name} height="350px" width="500px" style={{ borderRadius: "10px" }} />
      <Button sx={{ backgroundColor: "primary.contrastText", fontFamily: "Segoe UI", marginLeft: "30%", width: "200px" }}>Review</Button>
    </Card>
  );
};

const Projects = () => {
  const dispatch = useAppDispatch()
  const { projects } = useAppSelector(state => state.projectReducer)
  useEffect(() => {
    dispatch(getAllProject())
  }, [])
  console.log(projects);

  return (
    // <Container >
    //   <Card className='project_card' sx={{ borderRadius: '10px'}}>
    //     <div className='top_bar'>
    //       <AccountCircleIcon fontSize="large" />
    //       <div className='name_space'>
    //         <h2>John Doe</h2>
    //         <p>Software engineering student</p>
    //       </div>
    //     </div>
    //     <p>Welcome to the exciting world of web development! As a bachelor student embarking on a project in this dynamic field, you're about to delve into a realm where creativity and technology intersect. Web development is more than just coding....</p>
    //     <img src="https://elements-cover-images-0.imgix.net/b0ddb8bb-7e2b-4a75-8128-28f5917ea45e?auto=compress%2Cformat&fit=max&w=2038&s=9cb0f54643a88520676c528c5c1b6f67" alt="" height="350px" width="500px" style={{borderRadius: "10px"}}></img>
    //     <Button sx={{backgroundColor: "primary.contrastText", fontFamily: "Segoe UI", marginLeft:"30%", width: "200px"}}>Review</Button>
    //   </Card>
    // </Container>
    <Container>
      {projects.map(project => (
        <CombinedCard key={project._id} project={project} />
      ))}
    </Container>
  )
}

export default Projects