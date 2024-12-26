import './App.css'
import AuthLayout from './components/layout/AuthLayout'
import Login from './pages/Login'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './pages/Register'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />}/>
          <Route path='Register' element={<Register />}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
