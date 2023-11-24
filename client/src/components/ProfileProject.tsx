import React, { useEffect } from 'react'


import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { getAllProjectByEmail } from '../redux/reducers/ProjectReducer'
import { Button, Card, Container } from '@mui/material'
import { Project } from '../types/Project'
import { getUserByEmail } from '../redux/reducers/UserReducer'

interface ProjectCardProps {
    data: string
}

const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/";


const ProfileProject: React.FC<ProjectCardProps> = ({ data }) => {
    const dispatch = useAppDispatch()
    const { userProject } = useAppSelector(state => state.projectReducer)
    const { user, users } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        dispatch(getAllProjectByEmail({ email: data }))
    }, [data])

    console.log(userProject);
    return (
        <div>
            <h2>Projects</h2>
            <div className='education'>
                <Container>
                    {userProject.map(project => (
                        <Card className='project_card' sx={{ borderRadius: '10px' }}>
                            <div className='top_bar'>
                                <div className='name_space'>
                                    <div className='profileInfo'>
                                        <img src={imageUrl + user.image} alt={user.email} height="30px" width="30px" style={{ borderRadius: "10px" }} />
                                        <p>{user.first_name} {user.last_name}</p>
                                    </div>
                                    <h2>{project.name}</h2>
                                    <p>{project.email}</p>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                            <img src={imageUrl + project.image} alt={project.name} height="350px" width="500px" style={{ borderRadius: "10px" }} />
                            <Button sx={{ backgroundColor: "primary.contrastText", fontFamily: "Segoe UI", marginLeft: "30%", width: "200px" }}>Review</Button>
                        </Card>
                    ))}
                </Container>
            </div>
        </div>

    )
}

export default ProfileProject