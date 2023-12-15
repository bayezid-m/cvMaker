import React from 'react'
import EventComponent from '../components/EventComponent'
import '../Styles/EventComponent.css'

const Events = () => {
  return (
    <div className='events'>
      <h2>Events not to be missed</h2>
      <div className="cards">
        <EventComponent />
        <EventComponent />
        <EventComponent />
        <EventComponent />
      </div>

    </div>
  )
}

export default Events