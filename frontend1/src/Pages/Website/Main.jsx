import React from 'react'
import Header from '../../Components/Website/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Website/Footer'

const Main = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
      
    </>
  )
}

export default Main
