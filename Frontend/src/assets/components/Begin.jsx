import React from "react";
import NavBar from "./ends/NavBar";
import Welcome from "./begin/Welcome";
import Footer from "./ends/Footer";
import Retry from "./begin/Retry";
import Offert from "./begin/Offert";

function Begin() {
    return (
        <>
            <NavBar />
            <Welcome />
            <Offert />
            <Retry />
            <Footer />
        </>
    )
}

export default Begin;