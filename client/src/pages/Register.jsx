import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../api/authApi'

const Register = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    //新規登録APIを叩く
    try {
      const res = await authApi.register({username, password, confirmPassword,});
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log('新規登録に成功しました');
      navigate('/');
    } catch(err) {
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if(err.path === 'username') {
          setUsernameErrText(err.msg);
        }
        if(err.path === 'password') {
          setPasswordErrText(err.msg);
        }
        if(err.path === 'confirmPassword') {
          setConfirmPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField fullWidth id='username' label='お名前' margin='normal' name='username' required helperText={usernameErrText} error={usernameErrText !== ''} disabled={loading} />
        <TextField fullWidth id='password' label='パスワード' margin='normal' name='password' type='password' required helperText={passwordErrText} error={passwordErrText !== ''} disabled={loading} />
        <TextField fullWidth id='confirmPassword' label='確認用パスワード' margin='normal' name='confirmPassword' type='password' required helperText={confirmPasswordErrText} error={confirmPasswordErrText !== ''} disabled={loading} />
        <LoadingButton sx={{mt: 3, mb: 2}} fullWidth type='submit' loading={loading} color='primaey' variant='outlined' >アカウント作成</LoadingButton>
      </Box>
        <Button component={Link} to='/login' >すでにアカウントをお持ちですか？ログイン</Button>
    </>
  )
}

export default Register