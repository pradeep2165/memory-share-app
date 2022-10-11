import React, { useEffect, useState } from "react";
import { Container, Paper, Avatar, Typography, Button, Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { gapi } from "gapi-script";

const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    setShowPassword((setShowPassword) => !setShowPassword);
  };
  const switchMode = () => {
    setIsSignUp((isSignup) => !isSignup);
  };

  const googleSuccess = (res) => {
    console.log(res);
  };
  const googleError = (error) => {
    console.log(error);
    console.log("google authontication failure");
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: "871097789638-bhcfgs4b58vu9t9gmnq23fkiqhgl5khr.apps.googleusercontent.com" });
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="871097789638-bhcfgs4b58vu9t9gmnq23fkiqhgl5khr.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
