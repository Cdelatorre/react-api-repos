import { useContext, useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './views/Home'
import Create from './views/Create'
import Detail from './views/Detail'

import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/student/:id" element={<Detail />} />
        <Route path="/student/:id/edit" element={<Create isEditing={true} />} />
      </Routes>
    </>
  )
}

export default App
