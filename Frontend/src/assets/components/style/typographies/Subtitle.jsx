import { Typography, styled } from "@mui/material";

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#687690",
    fontWeight: "500",
    mt: 5,
    mb: 4,
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
        fontSize: "18px",
    },
}));

export default Subtitle