import "tailwindcss/tailwind.css";
import {AuthProvider} from "../hooks/useAuth";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  )
}

export default MyApp
