import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from "react-router-dom"
import { path } from '../../utils/constant'
import { Header , Sidebar } from '../System'

const System = () => {
  const {isLoggedIn} =  useSelector(state => state.auth)

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true}/>
  
  return (
    <div className='w-full flex min-h-screen flex-col items-center h-screen'>
        <Header/>
        <div className='flex w-full h-screen flex-auto'>
          <Sidebar />
          <div className='flex-auto bg-white h-full p-4 overflow-y-scroll'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default System