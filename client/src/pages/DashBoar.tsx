import { Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import Projects from '../components/Projects'
import { getAllProject } from '../redux/reducers/ProjectReducer'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'

const DashBoar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.userReducer)
  const token: any = localStorage.getItem("token" || "")

  useEffect(() => {
    if(token){
      dispatch(getAllProject())
    }
    else{
        navigate('/login')
    }
  }, [user])

  const { projects } = useAppSelector(state => state.projectReducer)
  return (
    <Container className='App'>
    < Projects/>
    </Container>
  )
}

export default DashBoar

