import React from 'react';
import NavBar from './ends/NavBar';
import Footer from './ends/Footer';
import { Box } from '@mui/material';
import { Entertainment } from './animation/Entertainment';
import working from '../animation/workingOnIt.json';
import Subtitle from './style/typographies/Subtitle';

function Home() {
    return (
        <>
            <NavBar />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '70vh',
                }}
            >
                <Subtitle> Trabajando en ello . . . </Subtitle>
                <Entertainment animationJSON={working} />
            </Box>
            <Footer />
        </>
    )
}

export default Home