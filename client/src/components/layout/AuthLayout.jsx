import { Box, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import memoLogo from '../../assets/images/logo.png'
import authUtils from '../../utils/authUtils'

const AuthLayout = () => {

  const navigate = useNavigate();

  useEffect(() => {
    //jwtを持っているか
    const checkAuth = async() => {
      //認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if(isAuth) {
        navigate('/');
      }
    };
    checkAuth();
  },[navigate]);

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <Box sx={{mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column',}}>
          <img src={memoLogo} alt="" style={{width: 100, height: 100, mb: 3,}} />
          memo帳クローン開発
        </Box>
        <Outlet />
      </Container>
    </div>
  )
}

export default AuthLayout