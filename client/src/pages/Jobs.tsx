import React from 'react'

import JobComponent from '../components/JobComponent'
import '../Styles/JobComponent.css'
const Jobs = () => {
  return (
    <div className='jobCard'>
      <h2>Search your Job</h2>
      <div className="filter">
        <button className="item">Jobs</button>
        |
        <button className="item">Experience level</button>
        <button className="item">Company</button>
        <button className="item">Remote</button>
        <button className="item">Easy Apply</button>
        |
        <button className="item">All Filter</button>
      </div>
      <div className="compoCardContainer">
        <div className="compoCard">
          <JobComponent />
          <JobComponent />
          <JobComponent />
          <JobComponent />
        </div>
      </div>
    </div>
  )
}

export default Jobs