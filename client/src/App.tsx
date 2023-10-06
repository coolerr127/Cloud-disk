import { ThemeProvider } from "@mui/material";
import React from "react";
import SignIn from "./components/auth/SignIn";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
    </ThemeProvider>
  );
}

export default App;
