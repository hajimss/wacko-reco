import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import SongBox from './SongBox';
import Title from './Title';

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
        const response = await axios.get(`https://api.spotify.com/v1/me/top/${category}?limit=20`, {headers: {Authorization: `Bearer ${token}`}})
        setData(response.data.items)
        }
        getData()
    }, [category, token])
    
    const renderList = () => {
        if (data.length === 0) {
            return null
        } else {
            return data.map((item: Item | null) => {
                return <SongBox key={item!.id} mainTitle={item!.name}/>

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
            <Title title={`Your Top ${category[0].toUpperCase() + category.slice(1)}`}/>
            {renderList()}
        </Box>
    )
}

export default Tops