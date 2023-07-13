import { Box, Slider, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

interface handleSliderChangeFunction {
    (metric: string, value: number[]): void
}

interface MetricProp {
    metric: string;
    value: number[];
    handleSliderChange: handleSliderChangeFunction;
}

const MetricSlider: FC<MetricProp> = ({ metric, value, handleSliderChange }) => {
    const [currVal, setCurrVal] = useState(value)

    const sliderValueText = (value: number) => {
        return `${value / 100}`
    }

    const OnSliderChange = (
        event: Event,
        newValue: number | number[]
    ) => {
        console.log()
        handleSliderChange(metric, newValue as number[])
        setCurrVal(newValue as number[])
    }

    return (
        <Box
            sx={{ width: '25%', padding: 1}}
        >
            <Typography variant='subtitle1' fontSize={11}>{metric[0].toUpperCase() + metric.slice(1)}</Typography>
            <Slider
                getAriaLabel={() => metric}
                value={currVal}
                onChange={OnSliderChange}
                valueLabelDisplay="auto"
                getAriaValueText={sliderValueText}
                color='secondary'
            />
        </Box>
    )
}

export default MetricSlider