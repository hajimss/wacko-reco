import { Box, Typography } from '@mui/material'
import React from 'react'

const SongBox: React.FC<{mainTitle: string, subTitle?: string | string[]}> = ({mainTitle, subTitle}) => {
    const renderSub = () => {
        if (!subTitle) {
            return null
        }

        if (Array.isArray(subTitle)) {
            return (
                <Typography 
                    fontSize={10} 
                    fontWeight='light'
                >
                    <i>{`${Array.from(subTitle).join(' , ')}`}</i>
                </Typography>
            )
        }
        
        return (
            <Typography 
                fontSize={10} 
                fontWeight='light'
                >
                    {subTitle}
            </Typography>
        )
            
    }

    return (
    <Box sx={{padding:1, margin:0.5, borderRadius:'5px'}} bgcolor={'secondary.main'}>
        <Typography variant='body2' fontWeight='light'>{mainTitle}</Typography>
        {renderSub()}
    </Box>
  )
}

export default SongBox