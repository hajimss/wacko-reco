import React, { FC, FormEventHandler, useState } from 'react'
import { OutputTrack } from './interfaces/general.interfaces'
import { Box, Button, TextField } from '@mui/material'
import SongBox from '../../template/SongBox'
import Title from '../../template/Title'

interface HandleSaveSubmitInterface {
    (name: string): void
}

interface Props {
    data: OutputTrack[];
    handleSaveSubmit: HandleSaveSubmitInterface;
}

const RecoPlaylist: FC<Props> = ({data, handleSaveSubmit}) => {
    const [inputData, setInputData] = useState('')

    const onFormSubmit: FormEventHandler = (event) => {
        event.preventDefault()
        handleSaveSubmit(inputData)
    }


  return (
    <Box sx={{width:'90%', borderRadius:'5px', margin:2, padding:2}} bgcolor={'white'}>
        <Title title='Recommended Playlist'/>
        <Box sx={{display:'grid', margin:1}}>
        {data.map((track: OutputTrack) => {
            return <SongBox key={track.id} mainTitle={track.name} subTitle={track.artists.map((value)=> value.name)}/>
        })}
        </Box>
        <Box sx={{marginTop:2}}>
            <form onSubmit={onFormSubmit}>
                <Box
                    sx={{
                        display:'flex',
                        justifyContent: 'center',
                    }}
                >
                        <TextField required={true} onChange={e => setInputData(e.target.value)} id='playlist-name' value={inputData} variant='filled' label='Playlist Name' />
                    <Button 
                        sx={{width:'50%', margin: 1}} 
                        color='secondary' 
                        variant='contained' 
                        type='submit'
                    >Save Playlist</Button>
                    
                </Box>
            </form>
        </Box>
        
    </Box>
  )
}

export default RecoPlaylist