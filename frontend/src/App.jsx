import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar';

const App = () => {

  return (
    <>
    <Toaster/>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App