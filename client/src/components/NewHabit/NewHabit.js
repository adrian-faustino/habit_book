import React from 'react'
/** Subcomponents **/
import NewHabitForm from './NewHabitForm/NewHabitForm'
/** Styles **/
import './NewHabit.css';


const NewHabit = () => {

  return (
    <section className="NewHabit__section">
      <NewHabitForm />
    </section>
  )
}

export default NewHabit
