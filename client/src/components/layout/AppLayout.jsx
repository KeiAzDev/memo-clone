import { Box, Container } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import memoLogo from '../../assets/images/logo.png'
import authUtils from '../../utils/authUtils'
import Sidebar from '../common/Sidebar'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/features/userSlice'

const AppLayout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //jwtを持っているか
    const checkAuth = async() => {
      //認証チェック
      const user = await authUtils.isAuthenticated();
      if(!user) {
        navigate('/login');
      } else {
        //ユーザーをストアに保存
        dispatch(setUser(user));
      }
    };
    checkAuth();
  },[navigate]);

  return (
    <div>
      <Box sx={{display: 'flex',}}>
        <Sidebar />
        <Box sx={{flexGrow: 1, p: 1, width: 'max-content'}}>
          <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout