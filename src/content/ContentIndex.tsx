import { Box, Divider } from '@mui/material'
import React, { FC } from 'react'
import RecoIndex from './reco/RecoIndex'
import TopsIndex from './tops/TopsIndex'
import Title from '../template/Title'

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
      <Divider><Title title='Personalised Charts' /></Divider>
      <TopsIndex/>
    </Box>
  )
}

export default ContentIndex