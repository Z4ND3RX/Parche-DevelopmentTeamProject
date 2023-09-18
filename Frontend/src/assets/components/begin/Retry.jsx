import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Entertainment } from "../animation/Entertainment";
import what from "../../animation/What.json";

import LoginButton from "../buttons/LoginButton";
import CustomBox from "../style/CustomBox";
import Title from "../style/typographies/Title";
import Subtitle from "../style/typographies/Subtitle";
import Paragraph from "../style/typographies/Paragraph";

const Retry = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F5", minHeight: "63vh" }}>
      <Container>
        <CustomBox>
          <Box
            sx={{
              flex: "0.6",
              mt: 5,
            }}
          >
            <Entertainment animationJSON={what} />
          </Box>

          <Box sx={{ flex: "1" }}>
            <Subtitle
              variant="body2"
            >
              Consulta nuestras reseñas
            </Subtitle>
            <Title variant="h1">¿Aún no te decides?</Title>
            <Paragraph>
              Explora un diseño elegante y fácil de usar que te permite sumergirte en las experiencias compartidas por la comunidad.
            </Paragraph>
            <LoginButton text="Pruébalo Ya" variant="contained" />
          </Box>

        </CustomBox>
      </Container>
    </Box>
  );
};

export default Retry;
