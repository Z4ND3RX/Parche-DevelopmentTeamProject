import { Box, styled } from "@mui/material";

const Cover = styled(Box)(({ theme }) => ({
  display: "Block",
  position: "relative",
  width: "90%",
  height: "8rem",
  background:
    "linear-gradient(45deg, rgba(255,254,0,1) 16%, rgba(196,0,124,1) 69%)",
  borderRadius: "20px 20px 20px 20px",
  marginTop: "20px",
}));

export default Cover;
