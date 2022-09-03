import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
        <header>

        </header>
        <main>
            <Outlet/>
        </main>
    </>
  )
}

export default MainLayout