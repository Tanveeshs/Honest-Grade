import React,{useState,useEffect} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button
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
    fontWeight:'bold',
    color: "white",
    fontSize: "16px",
    "&:hover": {
      color: "white",
      borderBottom: "1px solid white",
    },
    '&:active': {
        color:'white'
    }
  },
}));

function DashboardStart() {
  const classes = useStyles();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() =>{
      //make your login request here
  })
  return (
      <>
      <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h5" className={classes.logo}>
          Student Test Portal
        </Typography>
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link} style={{marginRight:'50px'}}>
              Home
            </Link>
            {loggedIn === false ? (
                <div>
              <Link to="/login" className={classes.link} >
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
    {loggedIn?(
        <div style={{marginTop:'10%'}}>
        <h2 style={{margin:'10px'}}>Welcome student!</h2>
        <h3 style={{margin:'10px'}}>Please login with your student ID to begin your tests</h3>
    </div>
    ):(<div style={{marginTop:'10%'}}>
        <h2 style={{margin:'10px'}}>Welcome Rishabh!</h2>
        <h3 style={{margin:'10px'}}>Student ID: DJC3248 </h3>
        <h4 style={{margin:'10px'}}>You have 2 tests pending</h4>
        <Button color='default' variant='contained'>
        <Link to="/tests">
              Take your tests
            </Link>
        </Button>
    </div>)}
      </>
    
  );
}
export default DashboardStart;