import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { authorization, IAuthorizationData } from "../../actions/user";
import { useUserStore } from "../../stores/user.store";
import { formDataToObject } from "../../utils/common.utils";

interface IFormData {
  email: string;
  password: string;
}

const Authorization: React.FC = () => {
  const { userAuthorization } = useUserStore();

  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<IAuthorizationData>({
    email: "",
    password: "",
  });
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoadingBtn(true);
    const data = formDataToObject(new FormData(event.currentTarget));

    const isValid = validateForm(data as IAuthorizationData);

    if (isValid) {
      try {
        const { user } = await authorization(data as IAuthorizationData);
        await userAuthorization(user);
      } catch (err) {}
    }

    setLoadingBtn(false);
  };

  const validateForm = (formData: IFormData) => {
    const errors = {
      email: "",
      password: "",
    };

    let isValid = true;

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
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={!!formErrors.email}
            helperText={formErrors.email}
            onBlur={resetFieldError}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!formErrors.password}
            helperText={formErrors.password}
            onBlur={resetFieldError}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Box sx={{ position: "relative" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loadingBtn}
            >
              Sign In
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
          <Grid container>
            <Grid item xs>
              <NavLink to={""}>
                <Link variant="body2" component={"span"}>
                  Forgot password?
                </Link>
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to={"/registration"}>
                <Link variant="body2" component={"span"}>
                  Don't have an account? Sign Up
                </Link>
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Authorization;
