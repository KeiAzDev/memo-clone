import React, { useState } from 'react'
import { Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import memoApi from '../api/memoApi.js'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      console.log(res);
      navigate(`/memo/${res._id}`);
      setLoading(false);
    } catch(err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
      <LoadingButton variant='outlined' color='success' onClick={()=> createMemo()} loading={loading}>
        最初のメモを作成
      </LoadingButton>
    </Box>
  )
}

export default Home
