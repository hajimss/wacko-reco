import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PrefForm from './PrefForm'
import QueryString from 'qs'
import axios from 'axios'
import RecoPlaylist from './RecoPlaylist'
import { MetricObj, HandleSubmitInterface } from './interfaces/form.interfaces'
import { OutputTrack } from './interfaces/general.interfaces'

interface InputData {
  tracks: Set<string>;
  artists: Set<string>;
  metrics: MetricObj
}


const RecoIndex = () => {
  const [inputData, setInputData] = useState<InputData>({} as InputData)
  const [recoData, setRecoData] = useState([])


  useEffect(() => {
    const getData = async () => {
      console.log('input', inputData)
      const { tracks, artists, metrics } = inputData

      if (!metrics) {
        return
      }

      const query = QueryString.stringify({
        'limit': 10,
        'seed_artists': Array.from(artists).join(','),
        'seed_genres': 'hip-hop, r-n-b',
        'seed_tracks': Array.from(tracks).join(','),
        'min_danceability': metrics.danceability[0] / 100,
        'max_danceability': metrics.danceability[1] / 100,
        'min_acousticness': metrics.acousticness[0] / 100,
        'max_acousticness': metrics.acousticness[1] / 100,
        'min_instrumentalness': metrics.instrumentalness[0] / 100,
        'max_instrumentalness': metrics.instrumentalness[1] / 100,
      })

      const response = await axios.get('https://api.spotify.com/v1/recommendations?' + query,
        { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } })

      if (response.data.tracks.length !== 0) {
        setRecoData(response.data.tracks.map((track: OutputTrack) => {
          return { id: track.id, name: track.name, artists: track.artists }
        }))
      }
    }

    // get data if input data is loaded
    if (Object.keys(inputData).length !== 0) {
      getData()
    }

  }, [inputData])

  const handleSubmit: HandleSubmitInterface = (trackSeed, artistSeed, metrics) => {
    setInputData({ 'tracks': trackSeed, 'artists': artistSeed, 'metrics': metrics })
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        border: '2px solid',
        borderRadius: '5px'
      }}
    >
      {recoData.length !== 0 ? <RecoPlaylist data={recoData} /> : null}
      <PrefForm handleSubmit={handleSubmit} />
    </Box>
  )
}

export default RecoIndex