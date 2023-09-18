import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Entertainment } from "../animation/Entertainment";

import movie from "../../animation/icon/animation_lmnz1lhi.json";

import LoginButton from "../buttons/LoginButton";
import CustomBox from "../style/CustomBox";
import Title from "../style/typographies/Title";
import Subtitle from "../style/typographies/Subtitle";
import Paragraph from "../style/typographies/Paragraph";

function Welcome() {
    return (
        <Box sx={{ backgroundColor: "#F5F5F5", minHeight: "75vh" }}>
          <Container>
            <CustomBox>
              <Box sx={{ flex: "1" }}>
                <Subtitle
                  variant="body2"
                >
                  Bienvenido a Parche Vacaciones
                </Subtitle>
                <Title variant="h1">
                  Todos los parches que quieras a un click.
                </Title>
                <Paragraph
                >
                  ¡Bienvenido a un mundo de posibilidades infinitas! Únete a nosotros y sé parte de esta emocionante revolución digital, donde las ideas cobran vida y las posibilidades son ilimitadas.
                </Paragraph>
                <LoginButton text="Empieza Aquí" variant="contained" />
              </Box>
    
              <Box
                sx={{
                  flex: "0.6",
                  mt: 5,
                  ml: 10,
                }}
              >
                <Entertainment animationJSON={movie} />
              </Box>
            </CustomBox>
          </Container>
        </Box>
      );
    };
  
  export default Welcome;
