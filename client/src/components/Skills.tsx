import React, { useEffect, useState } from 'react'
import useAppSelector from '../hooks/useAppSelecter'
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';


import useAppDispatch from '../hooks/useAppDispatch'
import { updateUser } from '../redux/reducers/UserReducer';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UpdateUser } from '../types/UpdateUser';
import { User } from '../types/User';

// interface MyComponentProps {
//     data: string[];
//   }
//const Skills : React.FC<MyComponentProps> = (props) => {

const Skills = () => {
    const dispatch = useAppDispatch()
    const [skills, setSkills] = useState([''])
    const [doEdit, setDoEdit] = useState(false)
    const [newSkill, setNewSkill] = useState('')
    const [newSkills, setNewSkills] = useState([])
    const { user, users } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        setSkills(user?.skills)
    }, [doEdit])

    //console.log(skills);
    const openInput = () => {
        setDoEdit(!doEdit)
    }
  
    const handleCross = (index: any) => {
        const newSkill = [...skills]
        newSkill.splice(index, 1)
        setSkills(newSkill)
    }
    const handleAdd = () => {
        const newSkilArray = [...skills, newSkill]
        setSkills(newSkilArray)
    }
    const handleChange = () => {
        dispatch(updateUser({ userData: { id: user?._id, skills: skills }, userId: user?._id as string }));
        setDoEdit(false);
        window.location.reload()
    }

    return (
        <div>
            {doEdit ?
                <div>
                    <h2>Skills<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
                    <div>
                        <input type='test' value={newSkill} onChange={e => setNewSkill(e.target.value)} />
                        <button onClick={handleAdd}>Add</button>
                        <button onClick={handleChange}>Save</button>
                    </div>
                    <div className='skills'>
                        {skills.map((skill, index) => (
                            <div className='subskills' key={index}>{skill}<button className='skilledit' onClick={e => handleCross(index)}><CloseIcon /></button></div>
                        ))}
                    </div>
                </div> : <div>
                    <h2>Skills<button className='skilledit' onClick={openInput}><EditIcon /></button></h2>
                    <div className='skills'>
                        {user.skills.map((skill) => (
                            <div className='subskills'>{skill}</div>
                        ))}
                    </div>
                </div>}

        </div>
    )
}

export default Skills

