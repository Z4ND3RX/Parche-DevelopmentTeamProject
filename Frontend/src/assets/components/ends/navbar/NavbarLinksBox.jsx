import React, { useContext } from 'react'
import { styled } from '@mui/material';
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";

import NavLinkStyle from './NavLinkStyle';
import AuthContext from '../../../../context/AuthContext';

function NavbarLinksBox() {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    const NavbarLinksBox = styled(Box)(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(6),
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    }));
    return (
        <NavbarLinksBox>
            <NavLink to={"/"} style={{ textDecoration: "none" }}>
                <NavLinkStyle text="Inicio" />
            </NavLink>
            {isAuthenticated ? (
                <NavLink to={"/Events"} style={{ textDecoration: "none" }}>
                    <NavLinkStyle text="Eventos" />
                </NavLink>) : (<></>)}
            {isAuthenticated ? (
                <NavLink to={"/Profile"} style={{ textDecoration: "none" }}>
                    <NavLinkStyle text="Perfil" />
                </NavLink>
            ) : (
                <> </>
            )}
        </NavbarLinksBox>
    )
}

export default NavbarLinksBox