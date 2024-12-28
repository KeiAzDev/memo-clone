import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link } from 'react-router-dom'
import authApi from '../api/authApi'

const Register = () => {

  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');
    setConfirmPasswordErrText('');

    //入力欄の文字列を取得する
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;

    if(username === '') {
      error = true;
      setUsernameErrText('名前を入力してください');
    }
    if(password === '') {
      error = true;
      setPasswordErrText('パスワードを入力してください');
    }
    if(confirmPassword === '') {
      error = true;
      setConfirmPasswordErrText('確認用パスワードを入力してください');
    }
    if(password !== confirmPassword) {
      error = true;
      setConfirmPasswordErrText('パスワードと確認用パスワードが異なります');
    }

    if(error) return;

    //新規登録APIを叩く
    try {
      const res = await authApi.register({username, password, confirmPassword,});
      localStorage.setItem('token', res.token);
      console.log('新規登録に成功しました');
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField fullWidth id='username' label='お名前' margin='normal' name='username' required helperText={usernameErrText} />
        <TextField fullWidth id='password' label='パスワード' margin='normal' name='password' type='password' required helperText={passwordErrText} />
        <TextField fullWidth id='confirmPassword' label='確認用パスワード' margin='normal' name='confirmPassword' type='password' required helperText={confirmPasswordErrText} />
        <LoadingButton sx={{mt: 3, mb: 2}} fullWidth type='submit' loading={false} color='primaey' variant='outlined' >アカウント作成</LoadingButton>
      </Box>
        <Button component={Link} to='/login' >すでにアカウントをお持ちですか？ログイン</Button>
    </>
  )
}

export default Register