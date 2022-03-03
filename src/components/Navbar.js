import React,{useState,useEffect} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    lineStyle:'none',
    fontWeight:'bold',
    color: "white",
    fontSize: "16px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() =>{
      //make your login request here
  })
  return (
      <>
      <AppBar position="static" style={{backgroundColor:'black'}}>
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link} >
              Home
            </Link>
            {loggedIn === false ? (
                <div>
              <Link to="/login" className={classes.link}>
                Login
              </Link>
              </div>
            ):
            (
            <Link to="/tests" className={classes.link}>
              Your tests
            </Link>
            )}
            
          </div>
      </Toolbar>
    </AppBar>
    </>
    )
            }