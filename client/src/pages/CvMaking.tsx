import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'
import "../Styles/CVTemplate01.css"
import "../Styles/CVTemplate02.css"
import { getAllProjectByEmail } from '../redux/reducers/ProjectReducer'
import { getAllExperience } from '../redux/reducers/ExperienceReducer'
import { getAllEducation } from '../redux/reducers/EducationReducer'
import FeedbackModal from '../components/FeedBackModal';
import axios from 'axios';
import { addCV } from '../redux/reducers/UserCVReducer';

interface PrintComponentProps {
  content: React.ReactNode;
}
const PrintComponent: React.FC<PrintComponentProps> = ({ content }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.userReducer);

  const componentRef = useRef<HTMLDivElement | null>(null);
  const [imageSender, setImageSender] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleImage = async () => {
    try {
      if (componentRef.current) {
        const canvas = await html2canvas(componentRef.current);
        const imageData = canvas.toDataURL('image/jpeg');

        const formData = new FormData();
        formData.append('file', dataURItoBlob(imageData), 'your_image.jpg');
        formData.append('upload_preset', 'ade40fld');


        const response = await axios.post("https://api.cloudinary.com/v1_1/dv4j8hjqf/image/upload", formData);
        setImageSender(response.data.public_id);
        if (response.data.public_id) {
          dispatch(addCV({ userData: { email: user.email, image: response.data.public_id } }))
          navigate('/profile')
        }
        else {
          console.log("upload again");
        }
      }
    } catch (error) {
      console.error('Error occurred during image upload:', error);
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
      <button onClick={handleImage}>Save to profile</button>

      <p></p>
      <div ref={componentRef}>{content}</div>
    </div>
  );
};

//////


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
  const [feedback, setFeedback] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const exit = () => {
    navigate('/profile')
  }
  const handleButtonClick = (styleName: string) => {
    setActiveStyle(styleName);
  };


  const getFeedback = async () => {
    const pdf = new jsPDF();

    const appDiv = document.getElementById('pdfContent');
    if (appDiv) {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const textContent = Array.from(appDiv.children)
        .map((child) => {
          if (child instanceof HTMLElement) {
            return child.innerText;
          }
          return '';
        })
        .join('\n');

      pdf.text(textContent, 10, 10);
      const pdfBlob = pdf.output('blob');

      const formData = new FormData();
      formData.append('file', pdfBlob, 'my_cv.pdf');

      fetch('https://receiver-oucl.onrender.com/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API Response:', data);
          setFeedback(data.feedback);
          console.log(feedback);
          if (feedback !== null) {
            setModalIsOpen(true);
          }
        })
        .catch((error) => {
          console.error('Error sending PDF to API:', error);
        });
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="all">
      <div className="actions">
        <button onClick={getFeedback}>Feedback</button>       
        <div className="modal-container">
          <FeedbackModal isOpen={modalIsOpen} onClose={closeModal} feedback={feedback} />
        </div>

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
            {user.skills.length>0 ? <h4>Skills</h4> : <div></div>}
            {user.skills.map((skill) => (
              <div className='subskill'>{skill}</div>
            ))}
          </div>
          <div className="projects">
            {userProject.length>0 ? <div><h4>Projects</h4></div> : <div></div>}
            {userProject.map((project) => (
              <ul>
                <li>{project.name}</li>
                <li>{project.description}</li>
              </ul>
            ))}
          </div>
          <div className="experiences">
            {experiences.length>0 ? <div><h4>Experience</h4></div> : <div></div>}
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
            {educations.length>0 ? <div><h4>Education</h4></div> : <div></div>}
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