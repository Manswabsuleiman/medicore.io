import React from 'react'
import Homepage from '../components/Homepage'
import Departments from '../components/Departments'
import Medical from '../components/Medical'
import Services from '../components/Services'
import Appointments from '../components/Appointments'
import Question from '../components/Question'
import Specialists from '../components/Specialists'
import News from '../components/News'
import Ask from '../components/Ask'

const Home = () => {
  return (
    <div>
        <Homepage/>
        <Departments/>
        <Medical/>
        <Services/>
        <Appointments/>
        <Question/>
        <Specialists/>
        <News/>
        <Ask/>
    </div>
  )
}

export default Home