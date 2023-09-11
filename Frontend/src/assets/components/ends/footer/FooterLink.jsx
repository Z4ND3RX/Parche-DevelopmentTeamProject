import React from 'react'
import { styled } from '@mui/material';

function FooterLink(props) {

    const FooterLink = styled("span")(({ theme }) => ({
        fontSize: "16px",
        color: "#7A7A7E",
        fontWeight: "300",
        cursor: "pointer",
        "&:hover": {
            color: "#000",
        },
    }));
    return (
        <FooterLink>{props.text}</FooterLink>
    )
}

export default FooterLink