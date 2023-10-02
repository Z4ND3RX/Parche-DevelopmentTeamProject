import { Box, Container, styled, Typography } from "@mui/material";
import { useContext } from "react";
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

import {
  AlternateEmail,
  Call,
  Place,
  CalendarMonth,
  Person,
} from "@mui/icons-material";

import Footer from "./ends/Footer";
import JSONPretty from "react-json-pretty";

const Body = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Profile = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  return (
    isAuthenticated && (
      <>
        <NavBar />
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
                A continuación se reflejará la información actual acerca de su
                cuenta y la subscripción presente
                {/* <JSONPretty data={user}/> */}
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
        <Footer />
      </>
    )
  );
};

export default Profile;
