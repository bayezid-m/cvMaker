import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import Modal from 'react-modal';

import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { addExperience, deleteExperienceById, getAllExperience, getSingleExpById, updateSingleExp } from '../redux/reducers/ExperienceReducer'
import { Experience } from '../types/Experience';
import { deleteEducationById, getSingleEduById } from '../redux/reducers/EducationReducer';

interface MyModalProps {
    isOpen: boolean;
    closeModal: () => void;
    content: string;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, closeModal, content }) => {
    const dispatch = useAppDispatch()
    const [experienceId, setExperienceId] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newFarm, setNewFarm] = useState('')
    const [newStarting, setNewStarting] = useState('')
    const [newEnding, setNewEnding] = useState('')
    const { experience } = useAppSelector(state => state.experienceReducer)

    useEffect(() => {
        setExperienceId(experience._id as string)
        setNewDescription(experience.description)
        setNewTitle(experience.title)
        setNewFarm(experience.farm)
        setNewStarting(experience.starting)
        setNewEnding(experience.ending)
    }, [experience])


    const handleUpdate = () => {
        dispatch(updateSingleExp({
            expData: {
                title: newTitle,
                farm: newFarm,
                email: experience.email,
                description: newDescription,
                starting: newStarting,
                ending: newEnding
            }, 
            expId: content as string
        }))
        closeModal();
        window.location.reload()
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
                    <input type='text' value={newTitle} onChange={e => setNewTitle(e.target.value)}></input>
                    <input type='text' value={newFarm} onChange={e => setNewFarm(e.target.value)}></input>
                    <input type="text" value={newDescription} onChange={e => setNewDescription(e.target.value)}></input>
                    <input type='text' value={newStarting} onChange={e => setNewStarting(e.target.value)}></input>
                    <input type='text' value={newEnding} onChange={e => setNewEnding(e.target.value)}></input>
                </div>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={closeModal}>Close Modal</button>
            </div>
        </Modal>
    );
};
const Experiences = () => {
    const dispatch = useAppDispatch()
    const [doEdit, setDoEdit] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [hereExperience, setHereExperience] = useState<Experience[]>([])

    const { experiences } = useAppSelector(state => state.experienceReducer)
    console.log(experiences);
    const { user } = useAppSelector(state => state.userReducer);

    const [formData, setFormData] = useState({
        title: '',
        email: user.email,
        description: '',
        farm: '',
        starting: '',
        ending: ''
    });

    useEffect(() => {
        dispatch(getAllExperience())
        setHereExperience(experiences)
    }, [doEdit, formData])

    const openInput = () => {
        setDoEdit(!doEdit)
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        if (formData.ending === '') {
            setFormData({ ...formData, ending: 'running' })
        }
        const newExperiences: Experience[] = [...hereExperience, formData]
        setHereExperience(newExperiences)
        dispatch(addExperience({
            userData: {
                title: formData.title,
                email: user.email,
                description: formData.description,
                farm: formData.farm,
                starting: formData.starting,
                ending: formData.ending
            }
        }))
        dispatch(getAllExperience())
        setDoEdit(false)
    };
    const openModal = (content: string) => {
        setModalContent(content);
        dispatch(getSingleExpById(content))
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleDelete = (id: string) => {
        dispatch(deleteExperienceById(id))
        window.location.reload()
    }
    return (
        <div>
            <MyModal isOpen={modalIsOpen} closeModal={closeModal} content={modalContent} />
            {doEdit ? <div>
                <h2>Experience<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input name="description" type='text' value={formData.description} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Farm:</label>
                        <input type="text" name="farm" value={formData.farm} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Starting Date:</label>
                        <input type="date" name="starting" value={formData.starting} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Ending Date:</label>
                        <input type="date" name="ending" value={formData.ending} onChange={handleChange} />
                    </div>
                    <button type="submit">Add</button>
                </form>
                <div className='experience'>
                    {hereExperience?.map((exp) => (
                        <ul className='otherUl'>
                            <li><h4>{exp.title}</h4></li>
                            <li>Farm: {exp.farm}</li>
                            <li>{exp.description}</li>
                            <li>Starting: {exp.starting} Ending: {exp.ending}</li>
                            <button onClick={() => openModal(exp._id as string)}>Edit</button>
                            <button onClick={() => handleDelete(exp._id as string)}>Delete</button>
                        </ul>
                    ))}
                </div>
            </div> : <div>
                <h2>Experience<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
                <div className='experience'>
                    {experiences?.map((exp) => (
                        <ul className='otherUl'>
                            <li><h4>{exp.title}</h4></li>
                            <li>Farm: {exp.farm}</li>
                            <li>{exp.description}</li>
                            <li>Starting: {exp.starting} ending: {exp.ending}</li>
                        </ul>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default Experiences