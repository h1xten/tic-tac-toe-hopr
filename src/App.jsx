import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MainLayout from './layout/MainLayout'

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<MainLayout />}>
                
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App