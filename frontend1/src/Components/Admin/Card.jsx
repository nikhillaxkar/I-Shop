import React from 'react'

const Card = (props) => {
  return (
    <div className='p-2 shadow min-h-[500px]'>
         {props.children}
    </div>
  )
}

export default Card
