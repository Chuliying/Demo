import React from 'react'
import Line from './Line'

const Lines = () => {
    return (
        <>
            <Line dir='v' pos='lt' />
            <Line dir='v' pos='rt' />
            <Line dir='h' pos='lt' />
            <Line dir='h' pos='rb' />
        </>
    )
}

export default Lines