import { Typography } from '@mui/material'
import { Box, padding } from '@mui/system'
import React from 'react'

const WackoRecoTitle = () => {
  return (
    <Box
        sx={{
            border:'solid 1px',
            borderRadius: 1,
            display:'flex',
            bgcolor:'white',
            flexDirection:'column',
            margin: 2
        }}
    >   
    <Box
        sx={{
            display:'flex',
            flexDirection:'row',
            padding: 2
        }}
    >
        <Typography variant='h1'>
            Wacko
        </Typography>
        <Typography variant='h1' fontWeight='bold'>
            Reco
        </Typography>
    </Box>
    <Box sx={{paddingBottom:2}} textAlign='center'>
        <Typography variant='subtitle1'><i>This is a playlist builder based off the tracks, artists and metrics you like</i></Typography>
    </Box>
    </Box>
  )
}

export default WackoRecoTitle