import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return <Button size="small" variant="outlined" color="secondary" onClick={() => logout()}>Cerrar Sesión</Button>;
};

export default LogoutButton;
