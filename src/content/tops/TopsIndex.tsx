import { Box } from '@mui/material'
import React from 'react'
import Tops from '../../template/Tops'

const TopsIndex = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
    <Tops category='tracks'/>
    <Tops category='artists'/>
    </Box>
  )
}

export default TopsIndex