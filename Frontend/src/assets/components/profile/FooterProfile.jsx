import { Box, styled } from "@mui/material";

const FooterProfile = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: "1.5rem 2rem",
  boxShadow: "0 0 12px rgba(0, 0, 0, .2)",
  backgroundColor: "#fff",
  borderRadius: "15px",
  width: "60%",
}));

export default FooterProfile;
