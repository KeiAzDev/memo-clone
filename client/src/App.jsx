import './App.css'
import AuthLayout from './components/layout/AuthLayout'
import Login from './pages/Login'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './pages/Register'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import AppLayout from './components/layout/AppLayout'
import Home from './pages/Home'

function App() {

  const theme = createTheme({
    palette: { primary: blueGrey },
  })

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />}/>
            <Route path='Register' element={<Register />}/>
          </Route>

          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='memo' element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
