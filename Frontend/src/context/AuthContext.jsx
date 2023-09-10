import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;