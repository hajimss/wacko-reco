import { Box } from '@mui/material'
import React, { FC } from 'react'
import RecoIndex from './reco/RecoIndex'
import TopsIndex from './tops/TopsIndex'

const ContentIndex: FC = () => {


  return (
    <Box
      sx={{
        display:'flex', 
        flexDirection:'column', 
        width:'100%', 
        alignItems:'center'
      }}
    >
      <RecoIndex/>
      <TopsIndex/>
    </Box>
  )
}

export default ContentIndex