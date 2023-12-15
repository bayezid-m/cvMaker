import React from 'react'

import atc from '../demoImages/atc.jpg'
import '../Styles/JobComponent.css'
const JobComponent = () => {
  return (
    <div className='CompoItem'>
      <div className="company_logo">
        <img src={atc} alt="" style={{ height: "50px", borderRadius: 5}}/>
      </div>
      <div className="info">
        <h3>Summer trainee</h3>
        <p>ATC Finland</p>
        <p className="fade-text">Tampere, FinLand (hybrid)</p>
      </div>
    </div>
  )
}

export default JobComponent