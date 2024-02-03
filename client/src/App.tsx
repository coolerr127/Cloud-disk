import { ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { authorization } from "./actions/user";
import Login from "./components/auth/Login";
import RegistrationPage from "./components/auth/RegistrationPage";
import MainPage from "./components/mainPage/MainPage";
import { useUserStore } from "./stores/user.store";
import { theme } from "./theme/theme";

function App() {
  const { isAuth, userAuthorization } = useUserStore();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    userInit().then();
  }, []);

  const userInit = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { user } = await authorization();
        userAuthorization(user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>LOADING...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {!isAuth && (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<RegistrationPage />} />
            {/*<Route path="/" element={<MainPage />} />*/}

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
        {isAuth && (
          <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
