import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'
import "../Styles/CVTemplate01.css"
import "../Styles/CVTemplate02.css"
import { getAllProjectByEmail } from '../redux/reducers/ProjectReducer'
import { getAllExperience } from '../redux/reducers/ExperienceReducer'
import { getAllEducation } from '../redux/reducers/EducationReducer'
import axios from 'axios';

interface PrintComponentProps {
  content: React.ReactNode;
}
const PrintComponent: React.FC<PrintComponentProps> = ({ content }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const [imageSender, setImageSender] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleImage = async () => {
    if (componentRef.current) {
      const canvas = await html2canvas(componentRef.current);
      const imageData = canvas.toDataURL('image/jpeg');

      // Save image as a file
      saveAs(imageData, 'your_image.jpg');

      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append('file', dataURItoBlob(imageData), 'your_image.jpg');
      formData.append('upload_preset', 'ade40fld');

      try {
        const response = await axios.post<{ public_id: string }>(
          'https://api.cloudinary.com/v1_1/dv4j8hjqf/image/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setImageSender(response.data.public_id);
        console.log('Image uploaded successfully:', imageSender);
        console.log(imageSender);
      } catch (error) {
        console.error('Error occurred during image upload:', error);
      }
    }
  };
  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };
  return (
    <div>
      <button onClick={handlePrint}>Save as PDF</button><span>   </span>
      <button onClick={handleImage}>Save</button>
      <p></p>
      <div ref={componentRef}>{content}</div>
    </div>
  );
};
const CvMaking: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllExperience())
    dispatch(getAllEducation())
    dispatch(getAllProjectByEmail({ email: user.email }))
  }, [])
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.userReducer);
  const { educations } = useAppSelector(state => state.educationReducer)
  const { experiences } = useAppSelector(state => state.experienceReducer)
  const { userProject } = useAppSelector(state => state.projectReducer)
  const [activeStyle, setActiveStyle] = useState<string>('cvTemplate01');

  const exit = () => {
    navigate('/profile')
  }
  const handleButtonClick = (styleName: string) => {
    setActiveStyle(styleName);
  };


  const getFeedback = async () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Get the content of the "app" div
    const appDiv = document.getElementById('pdfContent');
    if (appDiv) {
      // Create a new jsPDF instance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Extract text content from child elements of the "app" div
      const textContent = Array.from(appDiv.children)
        .map((child) => {
          if (child instanceof HTMLElement) {
            return child.innerText;
          }
          return '';
        })
        .join('\n');

      // Add the extracted text content to the PDF
      pdf.text(textContent, 10, 10);

      // Download the PDF
      //pdf.save('my_cv.pdf');
      const pdfBlob = pdf.output('blob');

      // Create a FormData object and append the Blob as a file
      const formData = new FormData();
      formData.append('file', pdfBlob, 'my_cv.pdf');

      // Send the FormData to the API
      fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API Response:', data);
        })
        .catch((error) => {
          console.error('Error sending PDF to API:', error);
        });
    }
  };


  return (
    <div className="all">
      <div className="actions">
        <button onClick={getFeedback}>Feedback</button>
        <button onClick={() => handleButtonClick('cvTemplate01')}>Use Template 1</button>
        <button onClick={() => handleButtonClick('cvTemplate02')}>Use Template 2</button>
        <button className="exit" onClick={exit}>Exit</button>
      </div>
      <PrintComponent content={
        <div className={`app ${activeStyle}`} id="pdfContent">
          <div className="info">
            <h2>{user.first_name} {user.last_name}</h2>
            <p>{user.email}</p>
            <p>{user.status}</p>
            <p>{user.occupation}</p>
          </div>
          <div className="skill">
            {user.skills ? <h4>Skills</h4> : <div></div>}
            {user.skills.map((skill) => (
              <div className='subskill'>{skill}</div>
            ))}
          </div>
          <div className="projects">
            {userProject ? <div><h4>Projects</h4></div> : <div></div>}
            {userProject.map((project) => (
              <ul>
                <li>{project.name}</li>
                <li>{project.description}</li>
              </ul>
            ))}
          </div>
          <div className="experiences">
            {experiences ? <div><h4>Experience</h4></div> : <div></div>}
            {experiences?.map((exp) => (
              <ul>
                <li>{exp.title}</li>
                <li>Farm: {exp.farm}</li>
                <li>{exp.description}</li>
                <li>Starting: {exp.starting} ending: {exp.ending}</li>
              </ul>
            ))}
          </div>
          <div className="educations">
            {educations ? <div><h4>Education</h4></div> : <div></div>}
            {educations?.map((edu) => (
              <ul>
                <li>{edu.institution}</li>
                <li>Degree: {edu.degree}</li>
                <li>Gpa: {edu.gpa}</li>
                <li>Starting: {edu.starting} Graduate: {edu.ending}</li>
              </ul>
            ))}
          </div>
        </div>} />
    </div>

  )
}

export default CvMaking