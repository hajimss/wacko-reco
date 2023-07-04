import { Button } from '@mui/material'
import React, {MouseEventHandler} from 'react'

interface Props {
  onClick?: MouseEventHandler
}

const Logout: React.FC<Props>= ({onClick}) => {
  

  return (
    <Button
        sx={{
            bgcolor:'secondary.dark',
            margin: 5
        }}
      variant='contained'
      onClick={onClick}
    >
      Logout
    </Button>
  )
}

export default Logout