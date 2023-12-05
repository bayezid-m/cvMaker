import { Container } from '@mui/material'
import React, { useEffect } from 'react'

import Projects from '../components/Projects'
import { getAllProject } from '../redux/reducers/ProjectReducer'
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'

const DashBoar = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProject())
  }, [])

  const { projects } = useAppSelector(state => state.projectReducer)
  console.log(projects);
  return (
    <Container className='App'>
    < Projects/>
    </Container>
  )
}

export default DashBoar

