import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from 'react-modal';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'
import { authenticate, updateUser } from '../redux/reducers/UserReducer';
import { getAllEducation } from '../redux/reducers/EducationReducer'
import "../Styles/Profile.css"
import Skills from '../components/Skills';
import Educations from '../components/Educations';
import ProfileProject from '../components/ProfileProject';
import Experiences from '../components/Experience';
import { getAllProjectByEmail } from '../redux/reducers/ProjectReducer';
import { getCVByEmail } from '../redux/reducers/UserCVReducer';
import MyModal from '../components/CVModel';


const Profile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const defaultTheme = createTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [status, setStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [skills, setSkills] = useState([''])
  const [imageSender, setImageSender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, users } = useAppSelector(state => state.userReducer);
  const { educations, education } = useAppSelector(state => state.educationReducer)
  const { userCV } = useAppSelector(state => state.userCVReducer)

  const [doEdit, setDoEdit] = useState(false)
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [cvOwner, setCvOwner] = useState('');

  const logout = () => {
    localStorage.setItem("token", "")
    navigate('/')
  }

  useEffect(() => {
    dispatch(authenticate())
    initialValue()
    dispatch(getCVByEmail({ email: user?.email }))
    // dispatch(getAllEducation())
  }, [doEdit])



  const initialValue = () => {
    setFirstName(user?.first_name)
    setLastName(user?.last_name)
    setEmail(user?.email)
    setStatus(user?.status)
    setOccupation(user?.occupation)
    setPassword(user?.password)
    setRePassword(user?.password)
    setSkills(user?.skills)
    setImageSender(user?.image)
  }
  console.log(userCV);
  
  const runningObject = educations.find(obj => obj.ending === "running");


  const handleSubmit = () => {
    if (firstName === '' || email === '' || password === '' || rePassword === '') {
      setErrorMessage("Please fill all input")
    }
    else if (password !== rePassword) {
      setErrorMessage("Please match both password field")
    }
    else {
      dispatch(updateUser({ userData: { id: user?._id, first_name: firstName, last_name: lastName, email: email, status: status, occupation: occupation }, userId: user?._id as string }));
      setDoEdit(false);
    }
  }
  const handleButtonClick = () => {
    setLoading(true);

    // Simulate an asynchronous operation (e.g., fetching data) for 2 seconds
    setTimeout(() => {
      setLoading(false);

      // Navigate to another page after loading is complete
      navigate('/userCV');
    }, 2500);
  };
  const openModal = (content: string) => {
    setModalContent(content);
    setCvOwner(user.email)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + user?.image + ".jpg"

  const CVUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + userCV?.image + ".jpg"

  return (
    <div className='profile'>
      <h1 style={{ textAlign: 'center' }}>My Profile</h1>
      {!doEdit ?
        <div className='mainContainer'>
          <div className='container'>
            <div className='imageContainer'>
              <img src={imageUrl} className="poster" alt=" "></img>
            </div>
            <h1 style={{ textAlign: "center" }}>{user?.first_name} {user?.last_name}</h1>
            <h4>{runningObject?.institution}</h4>
            <p>Degree: {runningObject?.degree}</p>
            <p>GPA: {runningObject?.gpa}</p>
            <p>Status: {user?.status}</p>
            <p>Occupation: {user?.occupation}</p>
            <div>
              <button onClick={e => setDoEdit(true)}>Update profile</button>
            </div>
            <Button
              sx={{ backgroundColor: "primary.contrastText", marginTop: 1, width: "100px" }} onClick={logout}>Logout</Button>
          </div>
          <div>
            <h2>My CV</h2>
            {userCV?.image?<div className='cv'>
              <button className='CvShowButton' onClick={() => openModal(userCV?.image as string)}>
              <img src={CVUrl} className="poster" alt=" "></img>
              </button>          
            <MyModal isOpen={modalIsOpen} closeModal={closeModal} content={modalContent} owner={cvOwner}/>
            </div>: <div className='cv'>
              <h3>Make my CV</h3>
              <p>You can make your CV from existing profile data or make it from scratch with help of AI</p>
              <button className='cvButton' onClick={handleButtonClick}>From profile</button>
              <Link to='/cvInputs'><button className='cvButton'>Make New</button></Link>     
              <Dialog open={loading}>
                <DialogTitle><CircularProgress sx={{ marginLeft: '30%' }} /> <br />
                  Please wait</DialogTitle>
              </Dialog>
            </div>}
            <Skills />
            <Experiences />
            <Educations />
            <ProfileProject data={user.email} />
          </div>
        </div>
        :
        <div className='updateP'>
          <form >
            <div>
              <label>Firt Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>
            <div>
              <label>Email</label>
              <input type="email" className="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Status</label>
              <input type="text" className="status" value={status} onChange={e => setStatus(e.target.value)} />
            </div>
            <div>
              <label>Occupation</label>
              <input type="text" className="occupation" value={occupation} onChange={e => setOccupation(e.target.value)} />
            </div>
            <div>

              <Button sx={{ color: 'white', margin: 1 }} variant="contained" onClick={handleSubmit}>Update</Button>
              <button onClick={e => setDoEdit(false)}>Cancel</button>
            </div>
          </form>
        </div>
      }

    </div>
  )
}

export default Profile