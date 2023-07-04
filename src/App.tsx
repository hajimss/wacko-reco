import React, { useEffect, useState } from 'react';
import Login from './auth/Login';
import Logout from './auth/Logout';
import { Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContentIndex from './content/ContentIndex';
import WackoRecoTitle from './template/WackoRecoTitle';

const App: React.FC = () => {
  const [token, setToken] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('accessToken')){
      return
    }
    const url = window.location.href;

    if (url.includes('#')){
      const endIndex = url.indexOf('&token_type')
      const access_token = url.slice(36, endIndex)
      localStorage.setItem('access_token', access_token)
      setToken(access_token)
    }
    nav('/')
  }, [token])

  const onLogout = () => {
    localStorage.removeItem('access_token');
    setToken('')
    nav('/')
  }

  return (
    <Paper sx={{
                display:'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                padding: 7,
                bgcolor: 'primary.light'
              }}
                className="App">
      <WackoRecoTitle/>
      {token.length===0 ? 
        <Login/> 
        : 
        <Logout onClick={onLogout}/>}
      {token.length===0 ? null
        : 
        <ContentIndex/>}
    </Paper>
  );
}

export default App;