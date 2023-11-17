import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { getAllEducation } from '../redux/reducers/EducationReducer'
import { Education } from "../types/Education";

interface FormData {
  institutionName: string;
  degree: string;
  gpa: number;
  startDate: string;
  endDate: string;
}

const Educations = () => {
  const dispatch = useAppDispatch()
  const [doEdit, setDoEdit] = useState(false)
  const { educations, education } = useAppSelector(state => state.educationReducer)
  const { user, users } = useAppSelector(state => state.userReducer);

  const [hereEducations, setHereEducations] = useState<Education[]>([])

  useEffect(() => {
    setHereEducations(educations)
    //dispatch(getAllEducation())
  },)
  console.log(hereEducations);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    email: user.email,
    gpa: 0,
    starting: '',
    ending: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can handle the form submission logic here, for example, send the data to a server.
    // const formattedEndDate = formData.endDate.trim() === '' ? 'running' : formData.endDate;
    if (formData.ending === '') {
      setFormData({ ...formData, ending: 'running' })
    }
    const newEducations:Education[]  = [...hereEducations, formData]
    setHereEducations(newEducations)
    console.log('Form Data:', formData);
    setDoEdit(false)
  };

  const openInput = () => {
    setDoEdit(!doEdit)
  }

  return (
    <div>
      {doEdit ? <div>
        <h2>Education<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
        <form onSubmit={handleSubmit}>
          {/* Institution Name */}
          <label htmlFor="institution">Institution Name:</label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
          />

          {/* Degree */}
          <label htmlFor="degree">Degree:</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />

          {/* GPA */}
          <label htmlFor="gpa">GPA:</label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            required
          />

          {/* Starting Date */}
          <label htmlFor="starting">Starting Date:</label>
          <input
            type="date"
            id="starting"
            name="starting"
            value={formData.starting}
            onChange={handleChange}
            required
          />

          {/* Ending Date */}
          <label htmlFor="ending">Ending Date:</label>
          <input
            type="date"
            id="ending"
            name="ending"
            value={formData.ending}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
        <div className='education'>
          {hereEducations?.map((edu) => (
            <ul>
              <li><h4>{edu.institution}</h4></li>
              <li>Degree: {edu.degree}</li>
              <li>Gpa: {edu.gpa}</li>
              <li>Starting: {edu.starting} Graduate: {edu.ending}</li>
            </ul>
          ))}
        </div>
      </div> : <div>
        <h2>Education<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
        <div className='education'>
          {hereEducations?.map((edu) => (
            <ul>
              <li><h4>{edu.institution}</h4></li>
              <li>Degree: {edu.degree}</li>
              <li>Gpa: {edu.gpa}</li>
              <li>Starting: {edu.starting} Graduate: {edu.ending}</li>
            </ul>
          ))}
        </div>
      </div>}

    </div>
  )
}

export default Educations