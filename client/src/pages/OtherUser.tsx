import React, { useEffect } from 'react'
import useAppDispatch from '../hooks/useAppDispatch';
import { useNavigate, Link } from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelecter';
import { getAllProfile } from '../redux/reducers/UserReducer';
import '../Styles/UsersCard.css'
import { Button } from '@mui/material';
const OtherUser = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProfile());
  }, [])
  const { users } = useAppSelector(state => state.userReducer);
  console.log(users);
  return (
    <div className='usersCard'>
      <h1>Other people</h1>
      {users?.map(user => (
        <div className='childUserCard'>
          <div style={{display: "flex"}}>
          <img src={"https://res.cloudinary.com/dv4j8hjqf/image/upload/v1689848305/" + user?.image + ".jpg"} className="cardImage" alt=" "></img>
          <div className="data">
            <h3>{user.first_name} {user.first_name}</h3>
            <p>{user.occupation}</p>
          </div>
          </div> 
          <Link to={`/others/${user._id}`}>
          <Button
              sx={{ backgroundColor: "primary.contrastText", marginTop: "45%", width: "100px", height: "40px", marginRight:"30px" }}>View</Button>
          </Link>     
        </div>
      ))}
    </div>
  )
}

export default OtherUser