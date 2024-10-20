import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar';
import TransactionDetail from './components/TransactionDetail';

const App = () => {

  return (
    <>
    <Toaster/>
    <Navbar/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/transaction/:id' element={<TransactionDetail/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App