import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

//Button for login redirect with Auth0 API
function LoginButton(props) {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button variant={props.variant} color="secondary" onClick={() => loginWithRedirect()}>
      {props.text}
    </Button>
  );
}

export default LoginButton;
