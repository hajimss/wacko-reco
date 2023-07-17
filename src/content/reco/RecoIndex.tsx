import { Box, Typography } from '@mui/material'
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
  const [savedPlaylist, setSavedPlaylist] = useState(false)


  useEffect(() => {
    const getData = async () => {
      const { tracks, artists, metrics } = inputData

      if (!metrics) {
        return
      }

      const query = QueryString.stringify({
        'limit': 15,
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
        setSavedPlaylist(false)
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

  const handleSaveSubmit = (name: string) => {
    const savePlaylist = async () => {
      const requestBody = {
        name: name,
        public: true
      }
      const user_id = localStorage.getItem('user_id')
      const response = await axios.post(
          `https://api.spotify.com/v1/users/${user_id}/playlists`, 
          requestBody,
          { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
      )
      const playlistData = response.data
      const playlist_id = playlistData.id

      var addRequestBody = {
        uris: recoData.map((track: OutputTrack) => {
          return `spotify:track:${track.id}`})
      }

      const trackResponse = await axios.post(`
          https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
          addRequestBody,
          { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
          )
    }

    savePlaylist();
    setSavedPlaylist(true)

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
        borderRadius: '5px',
        margin:5
      }}
    >
      
      <PrefForm handleSubmit={handleSubmit} />

      {
        savedPlaylist ? 
        <Typography>Playlist Saved!</Typography>
        :
        recoData.length !== 0 ? 
        <RecoPlaylist data={recoData} handleSaveSubmit={handleSaveSubmit} /> 
        : 
        null
      }

    </Box>
  )
}

export default RecoIndex