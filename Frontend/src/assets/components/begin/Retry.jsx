import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Entertainment } from "../animation/Entertainment";
import question from "../../animation/icon/Question.json";

import LoginButton from "../buttons/LoginButton";
import CustomBox from "../style/CustomBox";
import Title from "../style/Title";

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
            <Entertainment animationJSON={question} />
          </Box>

          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 5,
                mb: 4,
              }}
            >
              Consulta nuestras reseñas
            </Typography>
            <Title variant="h1">¿Aún no te decides?</Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Explora un diseño elegante y fácil de usar que te permite sumergirte en las experiencias compartidas por la comunidad.
            </Typography>
            <LoginButton text="Pruébalo Ya" variant="contained" />
          </Box>

        </CustomBox>
      </Container>
    </Box>
  );
};

export default Retry;
