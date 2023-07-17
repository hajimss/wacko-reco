import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Data {
    display_name?: string;
    followers?: number;
    id: string;
}

const PersonalIndex = () => {
    const [data, setData] = useState<Data | null>(null)

    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const getData = async () => {
        const response = await axios.get(`https://api.spotify.com/v1/me`, {headers: {Authorization: `Bearer ${token}`}})
        setData(response.data)
        localStorage.setItem('user_id', response.data.id)
        }
        getData()
    }, [token])

    if(data === null){
        return (
            <div>'Fetching data'</div>
        )
    }
    
  return (
    <Box
        sx={{
            width: '75%',
            textAlign: 'center'
        }}
    >
        <Typography variant='subtitle2'>
        Hello, <i>{data.id}</i>. In Wacko Reco, you can create playlists 
        based off the track or artist seeds that you input to create the playlist. 
        <br/>
        <br/>
        Do note that you can only select three seeds (eg. one track seed and two artist seeds). 
        Seeds are used as the foundational information that helps the recommendation engine 
        find matching tracks. You can also play around with the metrics that will filter the tracks
        in your playlists to have certain attributes. If you're feeling dancey, you can turn up the danceability
        to the max! Last thing to note, if you're not getting any songs back, it might mean that
        you're filtering too much or the seeds just simply do not match. Just keep it loose keep
        mixing them around until you have gotten yourself the perfect playlist.
        <br/>
        <br/>
        Once done, you can save it into your library by giving it a name and pressing 'Save Playlist'.
        Have fun!!
        </Typography>
        
    </Box>
  )
}

export default PersonalIndex