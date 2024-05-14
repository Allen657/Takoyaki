import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Order from './pages/Order'
import { CartProvider } from './pages/CartProvider'
import TransitionAlerts from './pages/components/TransitionAlerts'
import ErrorFlash from './pages/components/ErrorFlash'
import MyOrders from './pages/MyOrders'
import axios from 'axios'
function App() {
  return (
    <>
      <CartProvider>
        <NavBar />
        <TransitionAlerts />
        <ErrorFlash />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/order' element={<Order />} />
          <Route path='/MyOrders' element={<MyOrders />} />
        </Routes>
      </CartProvider>
    </>
  )
}

export default App
