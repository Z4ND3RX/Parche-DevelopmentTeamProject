import {
  Box,
  Container,
  styled,
  Typography,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import "react-json-pretty/themes/monikai.css";
import AuthContext from "../../context/AuthContext";
import NavBar from "./ends/NavBar";
import UserProfile from "./profile/UserProfile";
import Header from "./profile/Header";
import Cover from "./profile/cover";
import Avatar from "./profile/Avatar";
import Biography from "./profile/Biography";
import FooterProfile from "./profile/FooterProfile";
import DataList from "./profile/DataList";
import IconStyle from "./profile/IconStyle";
import axios from "axios";

import {
  AlternateEmail,
  Call,
  Place,
  CalendarMonth,
  Person,
} from "@mui/icons-material";

import Footer from "./ends/Footer";
import JSONPretty from "react-json-pretty";
import PostEvents from "./profile/PostEvents";
import { API_URL } from "../../services/Apirest";

const Body = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Profile = () => {
  const [events, setEvents] = useState([]);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    let url = API_URL + `/events`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem with the GET request:", error);
        setLoading(false);
      });
  }, []);

  return (
    isAuthenticated && (
      <>
        <NavBar />
        <Container>
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => {
              setTabValue(newValue);
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              "& .Mui-selected": {
                color: "secondary", // Cambia el color del texto al seleccionar un tab
                borderBottom: "2px solid purple", // Cambia el color de la línea de abajo
              },
            }}
          >
            <Tab label="Detalles del Perfil" />
            <Tab label="Eventos Creados" />
            <Tab label="Favoritos" />
          </Tabs>

          {tabValue === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {/* Contenido de la pestaña "Detalles del Perfil" */}
              <UserProfile>
                <Header>
                  <Cover>
                    <Avatar>
                      <Box
                        component="img"
                        sx={{
                          width: "100%",
                          position: "relative",
                          borderRadius: "50%",
                        }}
                        alt={user.picture}
                        src={user.picture}
                      />
                    </Avatar>
                  </Cover>
                </Header>
                <Body>
                  <Biography>
                    <h1>{user.name}</h1>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                    >
                      A continuación se reflejará la información actual acerca
                      de su cuenta y la subscripción presente
                    </Typography>
                  </Biography>
                  <FooterProfile>
                    <DataList>
                      <li>
                        <IconStyle>
                          <AlternateEmail /> {user.email}
                        </IconStyle>
                      </li>
                      <li>
                        <IconStyle>
                          <Call /> 0000000000
                        </IconStyle>
                      </li>
                      <li>
                        <IconStyle>
                          <CalendarMonth /> Inicio: 10/10/2022
                        </IconStyle>
                      </li>
                    </DataList>
                    <DataList>
                      <li>
                        <IconStyle>
                          <Person /> {user.nickname}
                        </IconStyle>
                      </li>
                      <li>
                        <IconStyle>
                          <Place /> Colombia
                        </IconStyle>
                      </li>
                      <li>
                        <IconStyle>
                          <CalendarMonth /> Fin: 10/10/2023
                        </IconStyle>
                      </li>
                    </DataList>
                  </FooterProfile>
                </Body>
              </UserProfile>
              {/* Agrega aquí los detalles del perfil del usuario */}
            </Box>
          ) : tabValue === 1 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                maxHeight: "75vh",
                overflowY: "auto",
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                events.map((event) => (
                  <div>
                    {event.nicknameUser === user.nickname && (
                    <PostEvents
                      key={event.id}
                      event={event}
                      style={{
                        flex: "0 0 calc(33.333% - 20px)",
                        margin: "10px",
                      }}
                    />
                    )}
                  </div>
                ))
              )}
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {/* Contenido de la pestaña "Favoritos" */}
              {/* Puedes colocar aquí el contenido de la pestaña "Favoritos" */}
            </Box>
          )}
        </Container>
        <Footer />
      </>
    )
  );
};

export default Profile;
