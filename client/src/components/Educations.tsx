import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';

import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { addEducation, deleteEducationById, getAllEducation, getSingleEduById, updateSingleEdu } from '../redux/reducers/EducationReducer'
import { Education } from "../types/Education";

interface FormData {
  institution: string;
  degree: string;
  gpa: number;
  starting: string;
  ending: string;
}
interface MyModalProps {
  isOpen: boolean;
  closeModal: () => void;
  content: string;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, closeModal, content }) => {
  console.log(content);
  const dispatch = useAppDispatch()
  const[eduId, setEduId] = useState('')
  const [newInstitute, setNewInstitute] = useState('')
  const [newDegree, setNewDegree] = useState('')
  const [newGpa, setNewGpa] = useState<number>(0)
  const [newStarting, setNewStarting] = useState('')
  const [newEnding, setNewEnding] = useState('')
  const { educations, education } = useAppSelector(state => state.educationReducer)

  useEffect(() => {
    setEduId(education._id as string)
    setNewInstitute(education.institution)
    setNewDegree(education.degree)
    setNewGpa(education.gpa)
    setNewStarting(education.starting)
    setNewEnding(education.ending)
  }, [education])
  console.log(education);

  const handleUpdate =()=>{
    dispatch(updateSingleEdu({eduData:{id: eduId, institution: newInstitute, email: education.email, degree: newDegree, gpa: newGpa, starting: newStarting, ending: newEnding}, eduId: content as string }))
    closeModal();
    window.location.reload()
    // dispatch(updateUser({ userData: { id: user?._id, first_name: firstName, last_name: lastName, email: email, status: status, occupation: occupation }, userId: user?._id as string }));

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <div>
        <h2>Update this education</h2>
        <div>
          <input type='text' value={newInstitute} onChange={e => setNewInstitute(e.target.value)}></input>
          <input type='text' value={newDegree} onChange={e => setNewDegree(e.target.value)}></input>
          <input type="number" value={newGpa} onChange={e => setNewGpa(Number(e.target.value))}></input>
          <input type='text' value={newStarting} onChange={e => setNewStarting(e.target.value)}></input>
          <input type='text' value={newEnding} onChange={e => setNewEnding(e.target.value)}></input>
        </div>
        <p>{content}</p>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    </Modal>
  );
};

const Educations = () => {
  const dispatch = useAppDispatch()
  const [doEdit, setDoEdit] = useState(false)
  const { educations, education } = useAppSelector(state => state.educationReducer)
  const { user, users } = useAppSelector(state => state.userReducer);

  const [hereEducations, setHereEducations] = useState<Education[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');


  //console.log(educations);

  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    email: user.email,
    gpa: 0,
    starting: '',
    ending: '',
  });

  useEffect(() => {
    dispatch(getAllEducation())
    setHereEducations(educations)
  }, [doEdit, formData])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.ending === '') {
      setFormData({ ...formData, ending: 'running' })
    }
    const newEducations: Education[] = [...hereEducations, formData]
    setHereEducations(newEducations)
    dispatch(addEducation({
      userData: {
        institution: formData.institution,
        email: user.email,
        degree: formData.degree,
        gpa: formData.gpa,
        starting: formData.starting,
        ending: formData.ending
      }
    }))
    dispatch(getAllEducation())
    setDoEdit(false)
  };

  const openInput = () => {
    setDoEdit(!doEdit)
  }
  const openModal = (content: string) => {
    setModalContent(content);
    dispatch(getSingleEduById(content))
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEducationById(id))
    //setDoEdit(!doEdit)
    window.location.reload()
  }
  return (
    <div>
      <MyModal isOpen={modalIsOpen} closeModal={closeModal} content={modalContent} />
      {doEdit ? <div>
        <h2>Education<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
        <form onSubmit={handleSubmit}>
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
          {hereEducations.map((edu) => (
            <ul>
              <li><h4>{edu.institution}</h4></li>
              <li>Degree: {edu.degree}</li>
              <li>Gpa: {edu.gpa}</li>
              <li>Starting: {edu.starting} Graduate: {edu.ending}</li>
              <button onClick={() => openModal(edu._id as string)}>Edit</button>
              <button onClick={() => handleDelete(edu._id as string)}>Delete</button>
            </ul>
          ))}
        </div>
      </div> : <div>
        <h2>Education<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
        <div className='education'>
          {educations?.map((edu) => (
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