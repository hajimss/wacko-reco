import React, { FC } from 'react'
import { OutputTrack } from './interfaces/general.interfaces'
import { Box, Paper, List, ListItem, Typography, Button } from '@mui/material'
import SongCard from './SongCard'

interface Props {
    data: OutputTrack[]
}

const RecoPlaylist: FC<Props> = ({data}) => {
    
  return (
    <Box sx={{width:'100%', margin:2}}>
        <Typography variant='h5'>Recommended Playlist</Typography>
        <Box sx={{display:'grid', margin:1}}>
        {data.map((track: OutputTrack) => {
            return <SongCard key={track.id} name={track.name} artists={track.artists}/>
        })}
        </Box>
        <Box
            sx={{
                display:'flex',
                justifyContent: 'center'
            }}
        >
            <Button 
                sx={{width:'50%', margin: 1}} 
                color='secondary' 
                variant='contained' 
                type='submit'
            >Save Playlist</Button>
        </Box>
        
    </Box>
  )
}

export default RecoPlaylist