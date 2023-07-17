import { Button, Box, Checkbox, FormControl, FormControlLabel, Typography, Alert, Paper } from '@mui/material'
import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import MetricSlider from './MetricSlider';
import { TrackObj, ArtistObj, MetricObj, HandleSubmitInterface } from './interfaces/form.interfaces';
import axios from 'axios';
import Title from '../../template/Title';

interface Props {
    handleSubmit: HandleSubmitInterface;
}

interface DataObj {
    tracklist?: any;
    artistlist?: any;
}

const PrefForm: FC<Props> = ({handleSubmit}) => {

    const [trackSeed, setTrackSeed] = useState<Set<string>>(new Set())
    const [artistSeed, setArtistSeed] = useState<Set<string>>(new Set())
    const [warning, setWarning] = useState('')


    const token = localStorage.getItem('access_token')
    const [data, setData] = useState<DataObj>({})
    
    // if too many metrics, we can make the initial state to another variable and make things DYNAMIC
    const [metricValue, setMetricValue] = useState<MetricObj>({danceability:[25,75], acousticness:[25,75], instrumentalness:[25,75]})

    useEffect(() => {

        const getData = async () => {
            const artistResponse = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=10`, {headers: {Authorization: `Bearer ${token}`}})
            const trackResponse = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=10`, {headers: {Authorization: `Bearer ${token}`}})
            
            setData({tracklist: trackResponse.data.items, artistlist: artistResponse.data.items})
            
        }

        getData()

    }, [token])

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        checked: boolean
    ) => {
        var { name } = event.target
        const [category, id] = name.split(' ')
        if (!checked) {
            // to remove item from respective set
            if (category === 'track'){
                const newSet = new Set(trackSeed)
                newSet.delete(id)
                setTrackSeed(newSet)
            } else {
                const newSet = new Set(artistSeed)
                newSet.delete(id)
                setArtistSeed(newSet)
            }
        } else {
            // to add item into respective set
            if (category === 'track'){
                setTrackSeed(new Set(trackSeed).add(id))
            } else {
                setArtistSeed(new Set(artistSeed).add(id))
            }
        }
    }

    const handleSliderChange = (
        metric: string,
        value: number[]
    ) => {
        var newMetricValue = metricValue
        newMetricValue[metric as keyof MetricObj] = value
        setMetricValue(newMetricValue)
    }

    const onHandleSubmit: FormEventHandler<Element> = (e) => {
        e.preventDefault()
        if (trackSeed.size + artistSeed.size > 3){
            setWarning('There can be a max of only 3 seeds.')
            return
        } else {
            handleSubmit(trackSeed, artistSeed, metricValue)
            setWarning('')
        }
    }

    const renderTrack = () => {
        return data.tracklist!.map((track: TrackObj) => {
            return(
                <FormControlLabel 
                    key={track.id}
                    control={<Checkbox 
                            name={'track '+track.id} 
                            value={track.id} 
                            onChange={handleCheckboxChange}/>} 
                    label={<Typography variant="subtitle2">{track.name}</Typography>}
                />
            ) 
        })
    }

    const renderArtist = () => {
        return data.artistlist!.map((artist: ArtistObj) => {
            return (
                <FormControlLabel 
                    key={artist.id}
                    control={<Checkbox 
                            name={'artist ' + artist.id} 
                            value={artist.id} 
                            onChange={handleCheckboxChange}/>} 
                    label={<Typography variant="subtitle2">{artist.name}</Typography>}
                />
            )
        })
    }

  return (

    <form onSubmit={onHandleSubmit}>
        <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            {warning ? <Alert variant='filled' severity='info'>{warning}</Alert> : null}
            <Box sx={{
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                justifyContent:'space-around',
            }}
            >
                <Paper sx={{width:'60%', padding:1, margin:0.5}} elevation={5}>
                    <Title title='Top Tracks Seed'/>
                    <FormControl>
                        {Object.keys(data).includes('tracklist') ? renderTrack() : null}
                    </FormControl>
                </Paper>
                <Paper sx={{width:'60%', padding:1, margin:0.5}} elevation={5}>
                    <Title title='Top Artists Seed'/>
                    <FormControl>
                        {Object.keys(data).includes('artistlist') ? renderArtist() : null}
                    </FormControl>
                </Paper>
            </Box>
            <Paper
                sx={{
                    display:'flex',
                    width:'90%',
                    flexDirection:'column',
                    padding:0.5
                }}
                elevation={5}
            >
                <Box>
                    <Title title='Metrics'/>
                </Box>
                <Box
                    sx={{
                        display:'flex',
                        justifyContent:'space-around',
                        flexWrap:'wrap',
                    }}
                >
                <MetricSlider value={metricValue['danceability']} metric='danceability' handleSliderChange={handleSliderChange}/>
                <MetricSlider value={metricValue['acousticness']} metric='acousticness' handleSliderChange={handleSliderChange}/>
                <MetricSlider value={metricValue['instrumentalness']} metric='instrumentalness' handleSliderChange={handleSliderChange}/>
                </Box>
                
            </Paper>
            <Button sx={{margin: 2, width:'50%'}} color='secondary' variant='contained' type='submit'>
                Generate Playlist
            </Button>
        </Box>
    </form>
    
  )
}

export default PrefForm