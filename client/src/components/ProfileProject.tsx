import React, { useEffect, useState } from 'react'


import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { addNewProject, getAllProjectByEmail } from '../redux/reducers/ProjectReducer'
import { Button, Card, Container } from '@mui/material'
import { Project } from '../types/Project'
import { getUserByEmail } from '../redux/reducers/UserReducer'
import axios from 'axios'

interface ProjectCardProps {
    data: string
}
interface FormData {
    name: string;
    description: string;
    image: File | null;
}
const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/";


const ProfileProject: React.FC<ProjectCardProps> = ({ data }) => {
    const dispatch = useAppDispatch()
    const { userProject } = useAppSelector(state => state.projectReducer)
    const { user, users } = useAppSelector(state => state.userReducer);
    const [doEdit, setDoEdit] = useState(false)
    const [imageSender, setImageSender] = useState('');

    useEffect(() => {
        dispatch(getAllProjectByEmail({ email: data }))
    }, [data, doEdit])

    const handleEdit = () => {
        setDoEdit(!doEdit)
    }
    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        image: null,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        const formData = new FormData();
        const file = event.target.files?.[0];
        if (file) {  
          formData.append('file', file); 
        }
        formData.append("upload_preset", "ade40fld");
        console.log("I am here");
        try {
          const response = await axios.post("https://api.cloudinary.com/v1_1/dv4j8hjqf/image/upload", formData);
          setImageSender(response.data.public_id);
          console.log(imageSender);
        } catch (error) {
          console.log("Error occurred during user registration:", error);
          console.log("upload error");
        }
      }

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(formData.name===''&&formData.name===''){
            console.log("please input project name and description");
        }
        else{
            dispatch(addNewProject({projectData:{email: user.email, name: formData.name, description: formData.description, image: imageSender}}))
            setDoEdit(false)
        }
        console.log('Form submitted with data:', formData);
      };
    return (
        <div>
            <h2>Projects</h2>
            <div className='education'>
                <Container>
                    <Button sx={{ backgroundColor: "primary.contrastText", fontFamily: "Segoe UI", marginLeft: "30%", width: "200px" }} onClick={handleEdit}>Add project</Button>
                    {!doEdit ? <div></div> : <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name">Project Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Project Description:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Project Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>}
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