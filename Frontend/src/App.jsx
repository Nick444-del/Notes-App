import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Admin from './pages/admin/Admin'

const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home />}></Route>
      <Route path='/login' exact element={<Login />}></Route>
      <Route path='/signup' exact element={<SignUp />}></Route>
      <Route path='/admin' exact element={<Admin />}></Route>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div className='w-100 h-[100%]'>
      {routes}
    </div>
  )
}

export default App