import { Typography } from '@mui/material'
import React, { FC } from 'react'

const Title: FC<{title: string}> = ({title}) => {
  return (
    <Typography sx={{padding:1, textAlign:'center'}} fontWeight={550}>{title}</Typography>
  )
}

export default Title