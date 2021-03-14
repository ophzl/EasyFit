import "tailwindcss/tailwind.css";
import {AuthProvider} from "../hooks/useAuth";
import React from "react";
import {Navbar} from "../components/navbar";

function MyApp({Component, pageProps}) {
    return (
        <AuthProvider>
            <Navbar/>
            <Component {...pageProps} />
        </AuthProvider>
    )
}

export default MyApp
