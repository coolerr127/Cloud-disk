import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Authorization from "./components/auth/Authorization";
import RegistrationPage from "./components/auth/RegistrationPage";
import { useUserStore } from "./stores/user.store";
import { theme } from "./theme/theme";

function App() {
  const { isAuth } = useUserStore();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {!isAuth && (
          <Routes>
            <Route path="/login" element={<Authorization />} />
            <Route path="/registration" element={<RegistrationPage />} />
            {/*<Route path="/" element={<MainPage />} />*/}

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
