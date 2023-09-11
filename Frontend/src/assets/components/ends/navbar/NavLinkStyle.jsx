import React from 'react'
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material';

// style of navbar items
function NavLinkStyle(props) {
    const NavLinkStyle = styled(Typography)(({ theme }) => ({
        fontSize: "18px",
        color: "#4F5361",
        fontWeight: "bold",
        cursor: "pointer",
        "&:hover": {
            color: "#9500D6",
        },
    }));
    return (
        <NavLinkStyle variant="body2"> {props.text} </NavLinkStyle>
    )
}

export default NavLinkStyle