import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from '../reducers/authReducer'
import Slack from './Slack'
import Login from './Login'
import Reg from './Reg'
import NotFound from './NotFound'
import '../App.css'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      navigate('/login', {replace: true})
  }
  },[])
  
  
  return (
      <Routes>
        <Route path='/' element={ <Slack /> } />
        <Route path='/login' element={ <Login dispatch={dispatch} setUser={actions.setUser}  /> } />
        <Route path='/reg' element={ <Reg dispatch={dispatch} setUser={actions.setUser}  /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
  )
}

export default App;
