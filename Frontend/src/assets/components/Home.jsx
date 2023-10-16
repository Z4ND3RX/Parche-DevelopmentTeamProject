import React, { useContext, useEffect, useState } from 'react';
import NavBar from './ends/NavBar';
import Footer from './ends/Footer';
import { Box, Button, CircularProgress, Modal } from '@mui/material';
import { Entertainment } from './animation/Entertainment';
import working from '../animation/workingOnIt.json';
import Subtitle from './style/typographies/Subtitle';
import Post from './home/Post';
import FilterMenu from './home/FilterMenu';
import { API_URL } from '../../services/Apirest';
import axios from 'axios';
import EventForm from './home/EventForm';

function Home() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // if (selectedCategoryId === "all") {//get user's posts 
        let url = API_URL + `/events`;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setEvents(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the GET request:', error);
                setLoading(false);
            });
        //  } 
        /*
        else {
            //get user's posts by category
            let urlCategory = API_URL + `/events-category/${selectedCategoryId}`;
            axios.get(urlCategoryUser)
                .then(response => {
                    console.log(response.data);
                    setPosts(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was a problem with the GET request:', error);
                    setLoading(false);
                });
        }
        */

    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <NavBar />
            <Modal open={isModalOpen} onClose={closeModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <EventForm onCancel={closeModal} />
                </Box>
            </Modal>

            <Box sx={{ display: 'flex', height: '75vh', maxWidth: '100vw', margin: 'auto' }}>
                <FilterMenu />
                <Box sx={{ width: '80%', maxHeight: '75vh', overflowY: 'auto' }}>
                    <Button sx={{ marginLeft: 5, marginTop: 2 }} variant="contained" onClick={openModal}>
                        Nuevo Evento
                    </Button>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        events.map(event => (
                            <Post key={event.id} event={event} />
                        ))
                    )}
                </Box>
            </Box>


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