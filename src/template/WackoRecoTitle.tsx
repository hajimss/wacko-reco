import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const WackoRecoTitle = () => {
  return (
    <Box
        sx={{
            border:'solid 1px',
            borderRadius: 1,
            width:'80%',
            display:'flex',
            bgcolor:'white',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            margin: 2,
        }}
    >   
    <Box
        sx={{
            width:'80%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            padding: 2,
        }}
    >
        <Box sx={{textAlign:'center', display:'flex', flexWrap:'wrap', justifyContent:'center',}}>
            <Typography variant='h2'>
                Wacko
            </Typography>
            <Typography variant='h2' fontWeight='bold'>
                Reco
            </Typography>
        </Box>
    </Box>
    <Box sx={{paddingBottom:2}} textAlign='center'>
        <Typography variant='subtitle1'><i>This is a playlist builder based off the tracks, artists and metrics you like</i></Typography>
    </Box>
    </Box>
  )
}

export default WackoRecoTitle