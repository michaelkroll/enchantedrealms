import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.tsx";
import theme from "./theme";

// Import the bootstrap css in order to style html elements using bootstrap

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Authenticator.Provider>
        <BrowserRouter>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </BrowserRouter>
      </Authenticator.Provider>
    </ChakraProvider>
  </React.StrictMode>
);
