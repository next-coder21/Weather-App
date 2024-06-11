import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Landing from './Components/Landing/Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='ui'>
   
    <Routes>
    <Route path='' element={<Landing />} />
    </Routes>
    </div>
    </>
  )
}

export default App
