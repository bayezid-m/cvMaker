import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import '../Styles/CvInputs.css'

interface Education {
  institute: string;
  degree: string;
  gpa: number;
  starting: string;
  ending: string;
}
interface Experience {
  title: string;
  description: string;
  farm: string;
  starting: string;
  ending: string;
}
interface Project {
  name: string;
  description: string;
}

const CvInputs = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  ///temporary inputs skills
  const [newSkill, setNewSkill] = useState('')
  ////educations
  const [newInstitute, setNewInstitute] = useState('')
  const [newDegree, setNewDegree] = useState('')
  const [newGpa, setNewGpa] = useState<number>(0)
  const [newStarting, setNewStarting] = useState('')
  const [newEnding, setNewEnding] = useState('')
  ////experience
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newFarm, setNewFarm] = useState('')
  const [newExperienceStarting, setNewExperienceStarting] = useState('')
  const [newExperienceEnding, setNewExperienceEnding] = useState('')
  ///projects
  const [newName, setNewName] = useState<string>('');
  const [newProjectDescription, setNewProjectDescription] = useState<string>('');

  const handleSubmit = () => {
    if (
      !firstname ||
      !lastname ||
      !occupation ||
      !status ||
      !email
    ) {
      alert('Please fill in at least basic info');
      return;
    }
    // Handle form submission
    navigate('/manualCv', {
      state: { userinfo: { firstname, lastname, occupation, email, skills, educations, projects, status, experiences } },
    });
  };

  //skills handling
  const handleCrossSkill = (index: any) => {
    const newSkill = [...skills]
    newSkill.splice(index, 1)
    setSkills(newSkill)
  }

  const handleAddSkill = () => {
    const newSkilArray = [...skills, newSkill]
    setSkills(newSkilArray)
    setNewSkill('')
  }

  ///education handling
  const handleAddEducation = () => {
    if (!newInstitute || !newDegree || !newStarting) {
      alert('Please fill in all fields');
      return;
    }
    const endingDate = newEnding || 'running';
    const newEducation: Education = {
      institute: newInstitute,
      degree: newDegree,
      gpa: newGpa,
      starting: newStarting,
      ending: endingDate,
    };

    setEducations([...educations, newEducation]);

    setNewInstitute('');
    setNewDegree('');
    setNewGpa(0);
    setNewStarting('');
    setNewEnding('');
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  ///experience handling

  const handleAddExperience = () => {
    if (!newTitle || !newDescription || !newExperienceStarting) {
      alert('Please fill in Title, Description, and Starting Date');
      return;
    }

    const endingDate = newExperienceEnding || 'running';

    const newExperience: Experience = {
      title: newTitle,
      description: newDescription,
      farm: newFarm,
      starting: newExperienceStarting,
      ending: endingDate,
    };

    setExperiences([...experiences, newExperience]);

    setNewTitle('');
    setNewDescription('');
    setNewFarm('');
    setNewExperienceStarting('');
    setNewExperienceEnding('');
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };


  //// Project
  const handleAddProject = () => {
    if (!newName || !newProjectDescription) {
      alert('Please fill in Name and Description');
      return;
    }

    const newProject: Project = {
      name: newName,
      description: newProjectDescription,
    };

    setProjects([...projects, newProject]);

    setNewName('');
    setNewProjectDescription('');
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };
  return (
    <div className='mainDiv'>
      <div className="info">
        <h2>Basic info</h2>
        <label>
          First Name:
          <input type="text" name="firstName" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Occupation:
          <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="email" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <br />
      </div>
      <h2>Skills</h2>
      <div className='skills'>
        <div>
          <input type='test' value={newSkill} onChange={e => setNewSkill(e.target.value)} />
          <button onClick={handleAddSkill}>Add</button>
        </div>
        {skills.map((skill, index) => (
          <div className='subskills' key={index}>{skill}<button className='skilledit' onClick={e => handleCrossSkill(index)}><CloseIcon /></button></div>
        ))}
      </div>
      <div>
        <h2>Educations</h2>
        <input
          type="text"
          placeholder="Institute"
          value={newInstitute}
          onChange={(e) => setNewInstitute(e.target.value)}
        />
        <input
          type="text"
          placeholder="Degree"
          value={newDegree}
          onChange={(e) => setNewDegree(e.target.value)}
        />
        <input
          type="number"
          placeholder="GPA"
          value={newGpa}
          onChange={(e) => setNewGpa(Number(e.target.value))}
        />
        <input
          type="date"
          placeholder="Starting Date"
          value={newStarting}
          onChange={(e) => setNewStarting(e.target.value)}
        />
        <input
          type="date"
          placeholder="Ending Date"
          value={newEnding}
          onChange={(e) => setNewEnding(e.target.value)}
        />
        <button onClick={handleAddEducation}>Add Education</button>
        <ul>
          {educations.map((education, index) => (
            <li key={index}>
              Instotution: {education.institute}, Degree: {education.degree}, GPA: {education.gpa}, Starting: {education.starting}, ending: {education.ending}
              <button onClick={() => handleDeleteEducation(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Experiences</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Farm"
          value={newFarm}
          onChange={(e) => setNewFarm(e.target.value)}
        />
        <input
          type="date"
          placeholder="Starting Date"
          value={newExperienceStarting}
          onChange={(e) => setNewExperienceStarting(e.target.value)}
        />
        <input
          type="date"
          placeholder="Ending Date (optional)"
          value={newExperienceEnding}
          onChange={(e) => setNewExperienceEnding(e.target.value)}
        />

        <button onClick={handleAddExperience}>Add Experience</button>

        <ul>
          {experiences.map((experience, index) => (
            <li key={index}>
              Title: {experience.title}, Description: {experience.description} Farm: {experience.farm}, Starting: {experience.starting}, Ending: {experience.ending}
              <button onClick={() => handleDeleteExperience(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Projects</h2>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
        />
        <button onClick={handleAddProject}>Add Project</button>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              Name: {project.name}, Description: {project.description}
              <button onClick={() => handleDeleteProject(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>Create CV</button>
    </div>
  )
}

export default CvInputs