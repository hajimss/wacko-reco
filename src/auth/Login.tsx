import React from 'react';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

const Login: React.FC = () => {
    var client_id:string=process.env.REACT_APP_CLIENT_ID!
    var callback_url:string= window.location.href

    // building the auth url
    let auth_url = new URL('https://accounts.spotify.com/authorize')
    auth_url.searchParams.set('client_id', client_id)
    auth_url.searchParams.set('redirect_uri', callback_url)
    auth_url.searchParams.set('response_type', 'token')
    auth_url.searchParams.set('scope', 'user-top-read')

  return (
    <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            padding:5,
            textAlign:'center'
        }}
    >
        <Typography variant='subtitle2'><i>Just login and start experimenting mate!!</i></Typography>
        <Button
            sx={{
                bgcolor:'secondary.dark'
            }}
            variant='contained'
            href={auth_url.href}
        >
            Login
        </Button>
    </Box>
  )
}

export default Login