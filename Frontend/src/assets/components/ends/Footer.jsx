import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

import behance from "../../animation/icon/7000-behance.json";
import linkedin from "../../animation/icon/74301-linkedin.json";
import github from "../../animation/icon/79259-github.json";

import { AnimationFooter } from "../animation/AnimationFooter";

import FooterLink from "./footer/FooterLink";
import FooterTypography from "./footer/FooterTypography";

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <CustomContainer>
        <CustomContainer>
          <Box>
            <FooterTypography text="Productos"/>

            <FooterLink text="PQRS"/>
            <br />
            <FooterLink text="Propiedades"/>
            <br />
            <FooterLink text="Nuestro Equipo"/>
          </Box>

          <Box>
          <FooterTypography text="Recursos"/>

            <FooterLink text="Eventos"/>
            <br />
            <FooterLink text="Semana"/>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Compañía
            </Typography>

            <FooterLink text="Términos y Condiciones"/>
            <br />
            <FooterLink text="Privacidad"/>
          </Box>

          <Box>
          <FooterTypography text="Créditos"/>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#7A7A7E",
                fontWeight: "500",
                mb: 2,
              }}
            >
              Encuentra este proyecto en GitHub
            </Typography>

            <IconBox>
              <AnimationFooter
                ruta="https://www.linkedin.com/in/z4nd3rx"
                animationJSON={linkedin}
              />
              <AnimationFooter
                ruta="https://github.com/Z4ND3RX/Parche-DevelopmentTeamProject"
                animationJSON={github}
              />
              <AnimationFooter
                ruta="https://www.behance.net/Z4ND3RX"
                animationJSON={behance}
              />
            </IconBox>
          </Box>
        </CustomContainer>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
