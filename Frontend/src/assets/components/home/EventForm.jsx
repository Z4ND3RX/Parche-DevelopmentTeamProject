import { Box, Button, Chip, CircularProgress, TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import React, { useEffect, useState, useContext } from "react";
import { API_URL } from "../../../services/Apirest";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import MyMap from "../map/marker/MyMap";
import AuthContext from "../../../context/AuthContext";

const EventForm = ({ onSubmit, onCancel }) => {
    const [loading, setLoading] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [existingRelations, setExistingRelations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        //get all categories
        let url = API_URL + "/categories";
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                setCategories(response.data);
                setLoadingCategories(false);
            })
            .catch((error) => {
                console.error("There was a problem with the GET request:", error);
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
            setSelectedCategories((prevSelected) =>
                prevSelected.filter((id) => id !== categoryId)
            );
        } else {
            // If the category is not selected, toggle it
            setSelectedCategories((prevSelected) => [...prevSelected, categoryId]);
        }
    };

    const handleLocationSelected = (location) => {
        //setSelectedLocation(location);
        setEvent((prevState) => ({
            ...prevState,
            form: {
                ...prevState.form,
                latitude: location.lat,
                longitude: location.lng,
            },
        }));
        //selectedLocation = location;
        //event.form.latitude = location.lat;
        //console.log("Ubicacion: " + location); // Imprime la ubicación seleccionada en la consola
    };

    // Función para manejar la selección de imágenes
    const handleImageSelect = (e) => {
        const files = e.target.files;
        const formData = new FormData();

        for (let i = 0; i < files.length; i++) {
            formData.append("myFiles", files[i]);
        }
        console.log(files.length);

        setSelectedImages(Array.from(files)); // Asegúrate de actualizar el estado de selectedImages
    };

    const [event, setEvent] = useState({
        form: {
            title: "",
            content: "",
            date: "",
            latitude: "",
            longitude: "",
            nicknameUser: user.nickname,
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
        setEvent((prevState) => ({
            ...prevState,
            form: {
                ...prevState.form,
                [name]: value,
            },
        }));
    };

    const handleDateTimeChange = (e) => {
        const date = document.getElementById('fecha').value; // Obtiene el valor del input de fecha
        const time = e.target.value; // Obtiene el valor del input de tiempo
      
        const isoDateTime = `${date}T${time}:00Z`; // Combina la fecha y la hora en el formato ISO-8601
      
        setEvent((prevState) => ({
            ...prevState,
            form: {
                ...prevState.form,
                date: isoDateTime,
            },
        }));
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica si hay al menos un archivo seleccionado
        if (selectedImages.length === 0) {
            // Si no hay archivos, muestra un mensaje de error o maneja el caso como prefieras
            console.error("Debes subir al menos un archivo");
            return;
        }
        // Crear el FormData para las imágenes
        const formData = new FormData();
        selectedImages.forEach((image, index) => {
            formData.append('myFiles', image);
        });

        // Agregar los datos del formulario al FormData
        const formFields = event.form;
        Object.keys(formFields).forEach((key) => {
            formData.append(key, formFields[key]);
        });

        //Categories to create relationship
        const eventsCategories = selectedCategories.map(categoryId => {
            return {
                idCategory: categoryId,
            };
        });

        // Agregar categorías al FormData
        const categoriesEventsJSON = JSON.stringify(eventsCategories);
        console.log(categoriesEventsJSON);
        formData.append('eventsCategories', categoriesEventsJSON);

        // Enviar el FormData con axios
        let url = API_URL + "/events";
        try {
            const response = await axios.post(url, formData);
            console.log("event created:", response.data);
        } catch (error) {
            console.error("create event error:", error);
            setEvent((prevState) => ({
                ...prevState,
                error: true,
                errorMsg: "failed event creation.",
            }));
        }
        onCancel();
    };



    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    return (
        <>
            <Box component="form" onSubmit={handleSubmit}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <div
                            style={{
                                overflowY: "auto",
                                maxHeight: "80vh",
                                paddingTop: "5px",
                            }}
                        >
                            <TextField
                                name="title"
                                type="text"
                                placeholder="Título"
                                id="outlined-basic"
                                label="Título"
                                variant="outlined"
                                onChange={handleChange}
                                sx={{ marginBottom: 2 }}
                            />

                            <Textarea
                                style={{
                                    width: "100%", // Ancho del textarea
                                    height: "120px", // Altura del textarea
                                    resize: "none", // Desactiva el cambio de tamaño
                                }}
                                name="content"
                                onChange={handleChange}
                                disabled={false}
                                minRows={2}
                                maxRows={6}
                                placeholder="Descripción"
                                label="Descripción"
                                size="lg"
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                            />

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginBottom: "8px",
                                }}
                            >
                                <label htmlFor="fecha">Fecha y Hora:</label>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <TextField
                                        name="date"
                                        type="date"
                                        id="fecha"
                                        variant="outlined"
                                        onChange={handleDateTimeChange}
                                        sx={{ marginRight: "8px" }} // Espacio entre los campos
                                    />
                                    <TextField
                                        name="time"
                                        type="time"
                                        variant="outlined"
                                        onChange={handleDateTimeChange}
                                    />
                                </div>
                            </div>
                            <br />
                            <MyMap onLocationSelected={handleLocationSelected} />
                            <br />
                            <Box display="flex" flexDirection="column">
                                {categories
                                    .reduce((rows, category, index) => {
                                        if (index % 3 === 0) {
                                            rows.push([]);
                                        }
                                        rows[rows.length - 1].push(category);
                                        return rows;
                                    }, [])
                                    .map((row, rowIndex) => (
                                        <Box
                                            key={rowIndex}
                                            display="flex"
                                            justifyContent="center"
                                            sx={{ marginBottom: "8px" }}
                                        >
                                            {row.map((category) => (
                                                <Chip
                                                    key={category.id}
                                                    label={category.title}
                                                    clickable
                                                    color="primary"
                                                    variant={
                                                        selectedCategories.includes(category.id)
                                                            ? "filled"
                                                            : "outlined"
                                                    }
                                                    onClick={() => handleCategoryChange(category.id)}
                                                    sx={{ margin: "4px" }}
                                                />
                                            ))}
                                        </Box>
                                    ))}
                            </Box>

                            <Button
                                sx={{ marginBottom: 2 }}
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                            >
                                Elegir imágenes
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={(e) => handleImageSelect(e)}
                                />
                            </Button>

                            <br />
                            <Button type="submit" variant="outlined" sx={{ marginBottom: 2 }}>
                                Guardar
                            </Button>
                            <Button
                                color="error"
                                variant="outlined"
                                onClick={onCancel}
                                sx={{ marginBottom: 2 }}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </>
                )}
            </Box>
        </>
    );
};

export default EventForm;
