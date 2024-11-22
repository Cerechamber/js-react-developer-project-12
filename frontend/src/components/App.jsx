import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Slack from './Slack';
import Login from './Login';
import NotFound from './NotFound';
import '../App.css'

function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Slack /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='*' element={ <NotFound /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
