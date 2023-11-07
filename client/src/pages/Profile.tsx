import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'
import { Button } from '@mui/material';
import { updateUser } from '../redux/reducers/UserReducer';
import "../Styles/Profile.css"


const Profile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [status, setStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [imageSender, setImageSender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, users } = useAppSelector(state => state.userReducer);
  const [doEdit, setDoEdit] = useState(false)

  const logout = () => {
    localStorage.setItem("token", "")
    navigate('/')
  }
  useEffect(() => {
    initialValue()
  }, [doEdit])

  const initialValue = () => {
    setFirstName(user?.first_name)
    setLastName(user?.last_name)
    setEmail(user?.email)
    setStatus(user?.status)
    setOccupation(user?.occupation)
    setPassword(user?.password)
    setRePassword(user?.password)
    setImageSender(user?.image)
  }

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

  const imageUrl = "https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + user?.image + ".jpg"

  return (
    <div className='profile'>
      <h1 style={{ textAlign: 'center' }}>Your Profile</h1>
      {!doEdit ?
        <div>
          <h1>{user?.first_name} {user?.last_name}</h1>
          <h3>{user?.email}</h3>
          <h3>{user?.status}</h3>
          <h3>{user?.occupation}</h3>
          <img src={imageUrl} className="poster" alt=" "></img>
          <div>
            <button onClick={e => setDoEdit(true)}>Update profile</button>
          </div>
        </div> :
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
      <Button variant="contained"
        sx={{ backgroundColor: 'primary.contrastText', color: 'white', margin: 1 }} onClick={logout}>Logout</Button>
    </div>
  )
}

export default Profile