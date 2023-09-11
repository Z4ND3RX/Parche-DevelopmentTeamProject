import React from 'react'
import { Typography } from "@mui/material";

function FooterTypography(props) {
    return (
        <Typography
            sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
            }}
        > {props.text}</Typography>
    )
}

export default FooterTypography