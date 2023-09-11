import { Box, styled} from "@mui/material";

const Avatar = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "110px",
    height: "110px",
    alignItems: "center",
    justifyContent: "center",
    border: "7px solid #FFFFFF",
    backgroundColor: "#DFE5F2",
    borderRadius: "50%",
    boxShadow: "0 0 12px rgba(0, 0, 0, .2)",
    position: "absolute",
    bottom: "-40px",
    left: "calc(50% - 60px)",
    zIndex: 1,
  }));

export default Avatar;