import { Box, styled } from "@mui/material";

const Biography = styled(Box)(({ theme }) => ({
  display: "block",
  padding: "1rem",
  boxShadow: "0, 0, 12px rgb(0, 0, 0, .2)",
  backgroundColor: "#FFFFFF",
  marginBottom: "1.25rem",
  textAlign: "center",
  marginTop: 20,
}));

export default Biography;
