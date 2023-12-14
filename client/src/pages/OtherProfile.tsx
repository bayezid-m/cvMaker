import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "../Styles/Profile.css"
import { Button, Card } from '@mui/material';
import MyModal from '../components/CVModel';

const API_URL = 'http://localhost:2000/api/v1/user/';

interface Education {
  // Define your Education interface here based on your JSON structure
  _id: string;
  email: string;
  institution: string;
  degree: string;
  gpa: number;
  ending: string;
  starting: string;
}
const OtherProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [cvOwner, setCvOwner] = useState('');

  // Use useEffect to log the user ID to the console when the component mounts
  useEffect(() => {
    console.log('User ID from route params:', userId);
    const fetchUserData = async () => {
      try {
        // Make the GET request with the user ID as a query parameter
        const response = await axios.get(`${API_URL}/${userId}`);

        setUserData(response.data);
      } catch (error) {
        // Handle errors, if any
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId]);

  const runningEducation = userData?.education.find((obj: Education) => obj.ending === 'running');
  const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + userData?.userData.image + ".jpg"
  const CVUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + userData?.userCV[0]?.image + ".jpg"
  const projectUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/";

  const openModal = (content: string) => {
    setModalContent(content);
    setCvOwner(userData?.userData?.email)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className='profile'>
      <h1 style={{ textAlign: 'center' }}>Profile</h1>
      <div className='mainContainer'>
        <div className='container'>
          <div className='imageContainer'>
            <img src={imageUrl} className="poster" alt=" "></img>
          </div>
          <h1 style={{ textAlign: "center" }}>{userData?.userData.first_name} {userData?.userData.last_name}</h1>
          <h4>{runningEducation?.institution}</h4>
          <p>Degree: {runningEducation?.degree}</p>
          <p>GPA: {runningEducation?.gpa}</p>
          <p>Status: {userData?.status}</p>
          <p>Occupation: {userData?.occupation}</p>
        </div>
        <div>
          <h2>CV</h2>
          <div className='cv'>
          <button className='CvShowButton' onClick={() => openModal( userData?.userCV[0]?.image as string)}>
              <img src={CVUrl} className="poster" alt=" "></img>
              </button> 
            <MyModal isOpen={modalIsOpen} closeModal={closeModal} content={modalContent} owner={cvOwner}/>
          </div>
          <h2>Skills</h2>
          <div className='skills'>
            {userData?.userData?.skills.map((skill: any) => (
              <div className='subskills'>{skill}</div>
            ))}
          </div>
          <h2>Experience</h2>
          <div className='experience'>
            {userData?.experience.map((exp: any) => (
              <ul className='otherUl'>
                <li><h4>{exp.title}</h4></li>
                <li>Farm: {exp.farm}</li>
                <li>{exp.description}</li>
                <li>Starting: {exp.starting} ending: {exp.ending}</li>
              </ul>
            ))}
          </div>
          <h2>Education</h2>
          <div className='education'>
            {userData?.education?.map((edu:any) => (
              <ul className='otherUl'>
                <li><h4>{edu.institution}</h4></li>
                <li>Degree: {edu.degree}</li>
                <li>Gpa: {edu.gpa}</li>
                <li>Starting: {edu.starting} Graduate: {edu.ending}</li>
              </ul>
            ))}
          </div>
          <h2>Projects</h2>
          <div className='education'>
            {userData?.project?.map((project: any) => (
              <Card className='project_card' sx={{ borderRadius: '10px' }}>
                <div className='top_bar'>
                  <div className='name_space'>
                    <div className='profileInfo'>
                      <img src={imageUrl} alt='' height="30px" width="30px" style={{ borderRadius: "10px" }} />
                      <p>{userData?.userData.first_name} {userData?.userData.last_name}</p>
                    </div>
                    <h2>{project.name}</h2>
                    <p>{project.email}</p>
                    <p>{project.description}</p>
                  </div>
                </div>
                <img src={projectUrl + project.image} alt={project.name} height="350px" width="500px" style={{ borderRadius: "10px" }} />
                <Button sx={{ backgroundColor: "primary.contrastText", fontFamily: "Segoe UI", marginLeft: "30%", width: "200px" }}>Review</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherProfile