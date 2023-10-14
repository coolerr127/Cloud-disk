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
import { NavLink } from "react-router-dom";
import { registration } from "../../actions/user";
import { formDataToObject } from "../../utils/common.utils";

const RegistrationPage: React.FC = () => {
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoadingBtn(true);
    console.log(event.currentTarget);
    const data = formDataToObject(new FormData(event.currentTarget));
    const res = await registration(data);

    setLoadingBtn(false);
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
            <Grid item xs={12} sm={6}>
              {/*<TextField*/}
              {/*  autoComplete="given-name"*/}
              {/*  name="firstName"*/}
              {/*  required*/}
              {/*  fullWidth*/}
              {/*  id="firstName"*/}
              {/*  label="First Name"*/}
              {/*  autoFocus*/}
              {/*/>*/}
            </Grid>
            <Grid item xs={12} sm={6}>
              {/*<TextField*/}
              {/*  required*/}
              {/*  fullWidth*/}
              {/*  id="lastName"*/}
              {/*  label="Last Name"*/}
              {/*  name="lastName"*/}
              {/*  autoComplete="family-name"*/}
              {/*/>*/}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
