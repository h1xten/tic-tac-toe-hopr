import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Homepage from './pages/Homepage/Homepage'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<Homepage/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App