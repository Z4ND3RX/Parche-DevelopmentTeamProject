import { Box, Button, Chip, CircularProgress, Grid, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../services/Apirest';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const EventForm = ({ onSubmit, onCancel }) => {
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [existingRelations, setExistingRelations] = useState([]);

    useEffect(() => {
        //get all categories 
        let url = API_URL + '/categories';
        axios.get(url)
            .then(response => {
                console.log(response.data);
                setCategories(response.data);
                setLoadingCategories(false);
            })
            .catch(error => {
                console.error('There was a problem with the GET request:', error);
                setLoadingCategories(false);
            });

        //Get the categories related to the event
        /*
        if (params.id) {
            let categoriesPostsUrl = API_URL + `/categoriesposts/${params.id}`;
            axios.get(categoriesPostsUrl)
                .then(response => {
                    const relatedCategoryIds = response.data.map(categoryPost => categoryPost.category.id);
                    setSelectedCategories(relatedCategoryIds);
                    setExistingRelations(response.data)
                })
                .catch(error => {
                    console.error('There was a problem with the GET request for related categories:', error);
                });
        }
        */
    }, []);

    const handleCategoryChange = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            // If the category is already selected, deselect it
            setSelectedCategories((prevSelected) => prevSelected.filter((id) => id !== categoryId));
        } else {
            // If the category is not selected, toggle it
            setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
        }
    };

    const [event, setEvent] = useState({
        form: {
            "titulo": "",
            "contenido": "",
            "date": "",
            "nicknameUser": "",
        },
        error: false,
        errorMsg: "",
        usernameError: false,
    });

    useEffect(() => {
        /*
        if (params.id) {
            let url = API_URL + `/posts/${params.id}`;
            axios.get(url)
                .then(response => {
                    setEvent({ form: response.data });
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was a problem with the GET request:', error);
                    setLoading(false);
                });
        } 
        */ //else {
        setLoading(false);
        // }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prevState => ({
            ...prevState,
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    }

    const handleSubmit = async (e) => {
        const postWithUserId = {
            ...post.form,
            idUser: user.id
        };
        let url = API_URL + "/posts"
        try {
            const response = await axios.post(url, postWithUserId);
            console.log("post created:", response.data);
        } catch (error) {
            // Handle error states
            console.error("create post error:", error);
            setPost(prevState => ({
                ...prevState,
                error: true,
                errorMsg: "failed post creation."
            }));
        }
        onClose();
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>

            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <TextField name='titulo'
                        type='text'
                        placeholder='titulo'
                        id="outlined-basic"
                        label="titulo"
                        variant="outlined"
                        onChange={handleChange}
                        value={event.form.titulo}
                        sx={{ marginBottom: 2 }} />

                    <Textarea
                        name='contenido'
                        onChange={handleChange}
                        value={event.form.contenido}
                        disabled={false}
                        minRows={2}
                        maxRows={6}
                        placeholder="contenido"
                        size="lg"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                    />
                    <Box display="flex" flexDirection="column">
                        {categories.reduce((rows, category, index) => {
                            if (index % 3 === 0) {
                                rows.push([]);
                            }
                            rows[rows.length - 1].push(category);
                            return rows;
                        }, []).map((row, rowIndex) => (
                            <Box
                                key={rowIndex}
                                display="flex"
                                justifyContent="center"
                                sx={{ marginBottom: '8px' }}
                            >
                                {row.map((category) => (
                                    <Chip
                                        key={category.id}
                                        label={category.title}
                                        clickable
                                        color="primary"
                                        variant={selectedCategories.includes(category.id) ? 'filled' : 'outlined'}
                                        onClick={() => handleCategoryChange(category.id)}
                                        sx={{ margin: '4px' }}
                                    />
                                ))}
                            </Box>
                        ))}
                    </Box>
                    <Button sx={{ marginBottom: 2 }} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload file
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    <br />
                    <Button type="submit" variant="outlined" sx={{ marginBottom: 2 }}>Save</Button>
                    <Button color="error" variant="outlined" onClick={onCancel} sx={{ marginBottom: 2 }}>Cancel</Button>
                </>
            )}
        </>
    );
}

export default EventForm