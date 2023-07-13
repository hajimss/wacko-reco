import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Typography, List } from '@mui/material'
import SongBox from './SongBox';

interface Item {
    id: string;
    name: string;
}

interface TopsProps {
    category: string
}

const Tops: FC<TopsProps> = (props: TopsProps) => {
    const { category } = props
    const token = localStorage.getItem('access_token')
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
        const response = await axios.get(`https://api.spotify.com/v1/me/top/${category}?limit=10`, {headers: {Authorization: `Bearer ${token}`}})
        setData(response.data.items)
        }
        getData()
    }, [category, token])
    
    const renderList = () => {
        if (data.length === 0) {
            return null
        } else {
            return data.map((item: Item | null) => {
                return(
                <List sx={{padding:2}} component="nav" key={item!.id} aria-label="mailbox folders">
                    <SongBox mainTitle={item!.name} subTitle={item!.id}/>
                </List>
                )

            })
        }

    }

    return (
        <Box
            sx={{
                width:'40%',
                borderRadius: '5px',
                margin: 1,
                bgcolor:'white'
            }}
        >
            <Typography sx={{padding:2, textAlign:'center'}} fontWeight='medium'>Your Top {category[0].toUpperCase() + category.slice(1)}</Typography>
            {renderList()}
        </Box>
    )
}

export default Tops