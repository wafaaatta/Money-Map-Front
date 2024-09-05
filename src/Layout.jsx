import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
        <Header />
        <div>
        <Outlet />
        </div>
        <Footer />
    </>
  )
}

export default Layout