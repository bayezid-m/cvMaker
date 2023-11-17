import React from 'react'


const handleClick=()=>{
    console.log("Button has been clicked");
}

const test = () => {
  return (
    <div>test
        <button onClick={handleClick}>Click me</button>
    </div>
    
  )
}

export default test