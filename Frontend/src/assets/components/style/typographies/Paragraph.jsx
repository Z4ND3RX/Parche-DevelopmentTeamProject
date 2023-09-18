import { Typography, styled } from "@mui/material";

const Subtitle = styled(Typography)(({ theme }) => ({
    fontSize: "18px", 
    color: "#5A6473", 
    my: 4,
    margin: theme.spacing(4, 0, 4, 0),
}));

export default Subtitle