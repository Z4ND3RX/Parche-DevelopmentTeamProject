import { Box } from '@mui/material'
import React from 'react'
import { Entertainment } from '../animation/Entertainment'
import notFound from '../../animation/404.json'

function NotFound404() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Entertainment animationJSON={notFound} />
        </Box>
    )
}

export default NotFound404