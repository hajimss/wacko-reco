import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material'

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
    }, [])

    if (data.length !== 0) {
        var dataString = JSON.stringify(data)
        localStorage.setItem(category, dataString)
    }

    const renderList = () => {
        if (data.length === 0) {
            return null
        } else {
            return data.map((item: Item | null) => {
                return(
                <List component="nav" key={item!.id} aria-label="mailbox folders">
                    <ListItem>
                        <div>
                            <Typography variant='body2' fontWeight='light'>{item!.name}</Typography>
                            <Typography fontSize={10} fontWeight='light'><i>{item!.id}</i></Typography>
                        </div>
                    </ListItem>
                </List>
                )

            })
        }

    }

    return (
        <Paper
            sx={{
                width:'50%',
                margin: 1
            }}
            elevation={5}
        >
            <Typography sx={{padding:2, textAlign:'center'}} fontWeight='medium'>Your Top {category[0].toUpperCase() + category.slice(1)}</Typography>
            {renderList()}
        </Paper>
    )
}

export default Tops