import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { CircularProgress, FormControl } from '@mui/material';
import { API_URL } from '../../../services/Apirest';
import axios from 'axios';

const FilterMenu = () => {

    const [loadingCategories, setLoadingCategories] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('all');

    useEffect(() => {
        //get all categories 
        let urlCategory = API_URL + '/categories';
        axios.get(urlCategory)
            .then(response => {
                console.log(response.data);
                setCategories(response.data);
                setLoadingCategories(false);
            })
            .catch(error => {
                console.error('There was a problem with the GET request:', error);
                setLoadingCategories(false);
            });
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategoryId(event.target.value);
        // Fetch posts based on the selected category here
    };

    return (
        <Box
            sx={{
                width: '20%',
                padding: '1rem',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                '@media (max-width: 768px)': {
                    width: '30%',
                },
                marginLeft: 5,
            }}
        >
            <InputLabel>Filtrar por:</InputLabel>

            {loadingCategories ? (
                <CircularProgress />
            ) : (
                <Box sx={{ marginTop: '1rem', marginBottom: '1rem', minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCategoryId}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem key="all" value="all">
                                All Categories
                            </MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )}

            <Button variant="contained" color="primary" fullWidth>
                Aplicar Filtro
            </Button>
        </Box>

    );
};

export default FilterMenu;
