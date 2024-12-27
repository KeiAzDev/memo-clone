import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import memoLogo from '../../assets/images/logo.png'

const AuthLayout = () => {
  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Box sx={{mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column',}}>
          <img src={memoLogo} alt="" style={{width: 100, height: 100, mb: 3,}} />
          memo帳クローン開発
        </Box>
      </Container>
      <Outlet />
    </div>
  )
}

export default AuthLayout