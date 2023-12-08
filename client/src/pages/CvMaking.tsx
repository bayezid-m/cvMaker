import React, { useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'
import "../Styles/userCV.css"
import { getAllProject } from '../redux/reducers/ProjectReducer'
import { getAllExperience } from '../redux/reducers/ExperienceReducer'
import { getAllEducation } from '../redux/reducers/EducationReducer'

interface PrintComponentProps {
    content: React.ReactNode;
}
const PrintComponent: React.FC<PrintComponentProps> = ({ content }) => {
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <div ref={componentRef}>{content}</div>
            <button onClick={handlePrint}>Print as PDF</button>
        </div>
    );
};
const CvMaking: React.FC = () => {
    useEffect(() => {
        dispatch(getAllProject())
        dispatch(getAllExperience())
        dispatch(getAllEducation())
    }, [])
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.userReducer);
    const { educations } = useAppSelector(state => state.educationReducer)
    const { experiences } = useAppSelector(state => state.experienceReducer)
    const { projects } = useAppSelector(state => state.projectReducer)
    const componentRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="all">
            <div className="actions">
                <button className="feedback">Feedback</button>
                <button className="save">Save</button>

                <button className="exit">Exit</button>
            </div>
            <PrintComponent content={
            <div className="app">
                <div className="info">
                    <p>{user.first_name} {user.last_name}</p>
                    <p>{user.email}</p>
                    <p>{user.status}</p>
                    <p>{user.occupation}</p>
                </div>
                <div className="skill">
                    {user.skills ? <h4>Skills</h4> : <div></div>}
                    {user.skills.map((skill) => (
                        <div className='subskill'>{skill}</div>
                    ))}
                </div>
                <div className="">
                    {projects ? <div><h4>Projects</h4></div> : <div></div>}
                    {projects.map((project) => (
                        <ul>
                            <li>{project.name}</li>
                            <li>{project.description}</li>
                        </ul>
                    ))}
                </div>
                <div className="experiences">
                    {experiences ? <div><h4>Experiences</h4></div> : <div></div>}
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
                    {educations ? <div><h4>Educations</h4></div> : <div></div>}
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