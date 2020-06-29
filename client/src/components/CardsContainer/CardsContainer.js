import React from 'react'

// props will be a list of components
const CardsContainer = props => {


  return (
    <div>
      {props.children}
    </div>
  )
}

export default CardsContainer
