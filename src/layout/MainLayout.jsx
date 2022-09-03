import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'

const MainLayout = () => {
  return (
    <>
        <header>
            <Header />
        </header>
        <main>
            <Outlet/>
        </main>
    </>
  )
}

export default MainLayout