import React, { FC } from 'react'
import { OutputTrack } from './interfaces/general.interfaces'
import { Box, Typography, Button } from '@mui/material'
import SongBox from '../../template/SongBox'
import Title from '../../template/Title'


interface Props {
    data: OutputTrack[]
}

const RecoPlaylist: FC<Props> = ({data}) => {
  return (
    <Box sx={{width:'90%', borderRadius:'5px', margin:2, padding:2}} bgcolor={'white'}>
        <Title title='Recommended Playlist'/>
        <Box sx={{display:'grid', margin:1}}>
        {data.map((track: OutputTrack) => {
            return <SongBox key={track.id} mainTitle={track.name} subTitle={track.artists.map((value)=> value.name)}/>
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