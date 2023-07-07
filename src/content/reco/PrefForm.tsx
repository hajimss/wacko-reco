import { Button, Box, Checkbox, FormControl, FormControlLabel, Typography, Alert } from '@mui/material'
import React, { FC, FormEventHandler, useState } from 'react'
import MetricSlider from './MetricSlider';
import { TrackObj, ArtistObj, MetricObj, HandleSubmitInterface } from './interfaces/form.interfaces';

interface Props {
    handleSubmit: HandleSubmitInterface;
}

const PrefForm: FC<Props> = ({handleSubmit}) => {

    const [trackSeed, setTrackSeed] = useState<Set<string>>(new Set())
    const [artistSeed, setArtistSeed] = useState<Set<string>>(new Set())
    const [warning, setWarning] = useState('')
    
    // if too many metrics, we can make the initial state to another variable and make things DYNAMIC
    const [metricValue, setMetricValue] = useState<MetricObj>({danceability:[25,75], acousticness:[25,75], instrumentalness:[25,75]})
    
    const tracklist = JSON.parse(localStorage.getItem('tracks') || '[]')
    const artistlist = JSON.parse(localStorage.getItem('artists') || '[]')    

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
        if (trackSeed.size + artistSeed.size > 4){
            setWarning('There can be a max of only 4 seeds.')
            return
        } else {
            handleSubmit(trackSeed, artistSeed, metricValue)
            setWarning('')
        }
    }

    const renderTrack = () => {
        return tracklist!.map((track: TrackObj) => {
            return(
                <FormControlLabel 
                    key={track.id}
                    control={<Checkbox name={'track '+track.id} value={track.id} onChange={handleCheckboxChange}/>} 
                    label={track.name}
                />
            ) 
        })
    }

    const renderArtist = () => {
        return artistlist!.map((artist: ArtistObj) => {
            return (
                <FormControlLabel 
                    key={artist.id}
                    control={<Checkbox name={'artist ' + artist.id} value={artist.id} onChange={handleCheckboxChange}/>} 
                    label={artist.name}
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
                justifyContent:'space-around',
            }}
            >
                <Box sx={{width:'50%', padding:1}}>
                    <Typography variant='h5'> Top Tracks Seed</Typography>
                    <FormControl>
                        {renderTrack()}
                    </FormControl>
                </Box>
                <Box sx={{width:'50%', padding:1}}>
                    <Typography variant='h5'> Top Artists Seed</Typography>
                    <FormControl>
                        {renderArtist()}
                    </FormControl>
                </Box>
            </Box>
            <Box
                sx={{
                    display:'flex',
                    width:'100%',
                    flexDirection:'column',
                }}
            >
                <Box>
                    <Typography variant='h5' >Metrics</Typography>
                </Box>
                <Box
                    sx={{
                        display:'flex',
                        justifyContent:'space-around'
                    }}
                >
                <MetricSlider value={metricValue['danceability']} metric='danceability' handleSliderChange={handleSliderChange}/>
                <MetricSlider value={metricValue['acousticness']} metric='acousticness' handleSliderChange={handleSliderChange}/>
                <MetricSlider value={metricValue['instrumentalness']} metric='instrumentalness' handleSliderChange={handleSliderChange}/>
                </Box>
                
            </Box>
            <Button sx={{width:'50%'}} color='secondary' variant='contained' type='submit'>
                Generate Playlist
            </Button>
        </Box>
    </form>
    
  )
}

export default PrefForm