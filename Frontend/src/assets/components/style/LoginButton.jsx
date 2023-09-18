import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

function LoginButton(props) {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button variant={props.variant} color="warning" onClick={() => loginWithRedirect()}>
      {props.text}
    </Button>
  );
}

export default LoginButton;
