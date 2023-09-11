import { Box, styled} from "@mui/material";

const UserProfile = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  alignItems: "center",
}));

export default UserProfile;
