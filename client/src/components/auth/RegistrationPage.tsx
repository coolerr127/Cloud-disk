import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { registration } from "../../actions/user";
import { formDataToObject } from "../../utils/common.utils";

interface IFormData {
  firstName: string;
  email: string;
  password: string;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<IFormData>({
    firstName: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoadingBtn(true);
    const data = formDataToObject(new FormData(event.currentTarget));

    const isValid = validateForm(data as IFormData);

    if (isValid) {
      try {
        await registration(data);
        navigate("/login");
      } catch (e) {
        console.log(e);
      }
    }

    setLoadingBtn(false);
  };

  const validateForm = (formData: IFormData) => {
    const errors = {
      firstName: "",
      email: "",
      password: "",
    };

    let isValid = true;

    if (formData.firstName.trim() === "") {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (formData.email.trim() === "") {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (formData.password.length < 5) {
      errors.password = "Password must be at least 5 characters long";
      isValid = false;
    }

    setFormErrors(errors);

    return isValid;
  };

  const resetFieldError = (event: React.FocusEvent) => {
    setFormErrors({ ...formErrors, [event.target.id]: "" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
                onBlur={resetFieldError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!formErrors.email}
                helperText={formErrors.email}
                onBlur={resetFieldError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!formErrors.password}
                helperText={formErrors.password}
                onBlur={resetFieldError}
              />
            </Grid>
          </Grid>
          <Box sx={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loadingBtn}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {loadingBtn && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-8px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to={"/login"}>
                <Link variant="body2">Already have an account? Sign in</Link>{" "}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
