import React from 'react'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

import event from '../demoImages/jobEvent.png'
import '../Styles/EventComponent.css'
import logo from '../demoImages/logo.png';

const EventComponent = () => {
  return (
    <div className='eventCard'>
      <div className="head">
        <img src={event} alt="" style={{ height: "200px", maxWidth: '340px', width: '100%', marginTop: 20 }} />
        <div className="desc">
          <p className="fade-text">TUESDAY 09 JANUARY 2024 FROM 14:00 TO 15:00</p>
          <p>How to master your job interview?</p>
          <p>ONLINE</p>
          <img src={logo} alt="" style={{ height: "50px", width: "150px", marginLeft: -10}} />
          <hr style={{marginLeft: -20, opacity: 0.5}}/>
          <BusinessCenterIcon/> 2 companies participates
        </div>
      </div>
    </div>
  )
}

export default EventComponent