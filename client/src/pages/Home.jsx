import React, { useState } from 'react'
import { Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'


const Home = () => {
  const [loading, setLoading] = useState(false); 

  const createMemo = () => {

  }

  return (
    <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
      <LoadingButton variant='outlined' color='success' onClick={()=> createMemo} loading={loading}>
        最初のメモを作成
      </LoadingButton>
    </Box>
  )
}

export default Home
