import { Paper, Typography } from '@mui/material';
import React, { FC } from 'react'
import { ArtistItem } from './interfaces/general.interfaces';

const SongCard: FC<{name: string; artists: ArtistItem[];}> = ({name, artists}) => {
  return (
    <Paper elevation={5} sx={{padding:1, margin:0.5, border:'1px solid'}}>
        <Typography variant='body2' fontWeight='light'>{name}</Typography>
        <Typography fontSize={10} fontWeight='light'><i>{`${Array.from(artists).join(' , ')}`}</i></Typography>
    </Paper>
  )
}

export default SongCard