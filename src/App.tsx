import React, { useEffect, useState } from 'react';
import Login from './auth/Login';
import Logout from './auth/Logout';
import { Box } from '@mui/material';
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
      const startIndex = url.indexOf('#access_token=')
      const access_token = url.slice(startIndex+14, endIndex)
      localStorage.setItem('access_token', access_token)
      setToken(access_token)
    }
    nav('/')
  }, [nav, token])

  const onLogout = () => {
    localStorage.removeItem('access_token');
    setToken('')
    nav('/')
  }

  return (
    <Box sx={{
                display:'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'primary.light',
                width: '100%'
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
    </Box>
  );
}

export default App;