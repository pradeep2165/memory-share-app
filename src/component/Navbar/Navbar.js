import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import memories from "../../images/memories.png";

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography to="/" className={classes.heading} variant="h2" align="center">
          Memories
          <img className={classes.image} src={memories} alt="icon" height="60" />
        </Typography>
        <Toolbar className={classes.toolbar}>
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navbar;
