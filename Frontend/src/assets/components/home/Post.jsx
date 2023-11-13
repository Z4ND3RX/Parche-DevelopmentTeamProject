import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import {
  Favorite,
  FavoriteBorder,
  MoreVert,
  Share,
  Close,
} from "@mui/icons-material";
import EventDate from "./EventDate";
import { API_URL } from "../../../services/Apirest";
import { styled } from "@mui/system";
import MapDetail from "./MapDetail";

// Estilo personalizado para el modal
const CustomModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled("div")({
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "600px",
  width: "100%",
  position: "relative", // Asegura que la posición relativa sea respetada por los elementos hijos
  overflow: "auto", // Habilita el scroll cuando el contenido excede el tamaño del contenedor
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: theme.zIndex?.modal + 1 || 1300,
}));

const Post = ({ event }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "purple", "orange", "pink"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{ margin: 5, maxWidth: 1000, maxHeight: "auto", marginLeft: 10 }}
        onClick={handleCardClick}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: getRandomColor() }} aria-label="recipe">
              {event.nicknameUser.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={event.nicknameUser}
          subheader={<EventDate date={event.date} />}
        />
        {event.eventImages && event.eventImages.length > 0 && (
          <Carousel sx={{ maxWidth: 600, maxHeight: 400, overflow: "auto" }}>
            {event.eventImages.map((image, index) => (
              <img
                key={index}
                src={API_URL + `/uploads/${image.name}`}
                alt={event.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ))}
          </Carousel>
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
        </CardActions>
      </Card>

      <CustomModal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="event-modal"
        aria-describedby="event-details"
      >
        <ModalContent sx={{ maxWidth: 850, maxHeight: 700, overflow: "auto" }}>
          <CloseButton onClick={handleCloseModal} aria-label="close">
            <Close />
          </CloseButton>
          <Box>
            <Typography variant="h4" gutterBottom>
              {event.title}
            </Typography>
            <Box sx={{ display: "flex", marginBottom: "16px" }}>
              <Box
                sx={{
                  flex: "1",
                  maxWidth: "50%",
                  maxHeight: "70vh",
                  overflow: "auto",
                  marginRight: "16px", // Ajusta el espacio aquí
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Detalles
                </Typography>
                {event.eventImages && event.eventImages.length > 0 && (
                  <Carousel>
                    {event.eventImages.map((image, index) => (
                      <img
                        key={index}
                        src={API_URL + `/uploads/${image.name}`}
                        alt={event.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </Carousel>
                )}
              </Box>
              <Box
                sx={{
                  flex: "1",
                  maxWidth: "50%",
                  maxHeight: "70vh",
                  overflow: "auto",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Ubicación
                </Typography>
                <MapDetail
                  initialLat={event.latitude}
                  initialLng={event.longitude}
                />
              </Box>
            </Box>

            <Typography variant="body1" color="textSecondary">
              {event.description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Fecha y hora: <EventDate date={event.date} />
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Participantes: #
            </Typography>

            {/* Agregar el botón Asistir */}
            <Button variant="contained" color="primary" sx={{ float: "right" }}>
              Asistir
            </Button>
          </Box>
        </ModalContent>
      </CustomModal>
    </>
  );
};

export default Post;
