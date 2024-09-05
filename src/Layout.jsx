import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Notification from './components/Notification'

const Layout = () => {
  return (
    <div className='bg-slate-100'>
        <Header />
        <div className='bg-slate-100'>
        <Outlet />
        </div>
        <Footer />
        <Notification />
    </div>
  )
}

export default Layout