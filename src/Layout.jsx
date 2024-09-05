import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initialize } from './redux/features/auth_store'

const Layout = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(initialize())
    }, [dispatch])

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