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
import ProfileProject from './ProfileProject';



interface ProjectCardProps {
  project: Project;
}

const CombinedCard: React.FC<ProjectCardProps> = ({ project, }) => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getUserByEmail({ email: project.email }));
  }, []);

  const { emailUser } = useAppSelector(state => state.userReducer);

  const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/";

  return (
    <Card className='project_card' sx={{ borderRadius: '10px' }}>
      <div className='top_bar'>
        <div className='name_space'>
          <div className='profileInfo'>
            <img src={imageUrl + project.user.image} alt={emailUser.email} height="30px" width="30px" style={{ borderRadius: "10px" }} />
            <p>{project.user.first_name} {project.user.last_name}</p>
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
  const { projects } = useAppSelector(state => state.projectReducer)
  console.log(projects);

  return (
    <Container>
      {projects.map(project => (
        <CombinedCard key={project._id} project={project} />
      ))}
    </Container>
  )
}

export default Projects