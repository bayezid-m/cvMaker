import React from 'react'
import { useLocation, Link } from 'react-router-dom';

interface UserInfo {
  firstname: string;
  lastname: string;
  occupation: string;
  email: string;
  status: string;
  skills: string[];
  educations: string[];
  projects: string[];
  experiences: string[];
}
const ManualCvMaking: React.FC = () => {
  const location = useLocation();
  const { userinfo } = location.state as { userinfo: UserInfo };
  console.log(userinfo);
  return (
    <div>ManualCvMaking</div>
  )
}

export default ManualCvMaking