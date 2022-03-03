import React,{useState,useEffect} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    float:'right',
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
    },
    '&:active': {
        color:'white'
    }
  },
}));

function DashboardStart() {
  const classes = useStyles();
  const [userDetails, setUser] = useState({});
  const sidebarStyles = {
    width:'25vw',
    height:'100%',
    position:'absolute',
    zIndex:'10',
    backgroundColor:'white',
    boxShadow: '0 0 2px lightgray',
    fontFamily: 'Noto Serif Display',
    border:'0.5px solid lightgray'
  }
  const sidebarContent = {
    height:'40%',
  }
  const sidebarHeader = {
    marginTop:'5%',
    display:'flex',
    justifyContent:'center',
  }
  const [loggedIn, setLoggedIn] = useState(false);

  return (
      <>
      <div style={sidebarStyles}>
        <div style={sidebarContent}>
          <div style={sidebarHeader}>
            <h3 style={{fontWeight:'bold'}}>
            Honest Grade
            </h3>
          </div>
          <div style={{marginTop:'45%',marginLeft:'8%'}}>
          <h5>Tests</h5>
          <h5>Assignments</h5>
          <h5>Account</h5>
          <h5>Other</h5>
          </div>
        </div>
      </div>
      <AppBar position="static" style={{backgroundColor:'black'}}>
      <CssBaseline />
      <Toolbar>
          <div className={classes.navlinks}>
            
            {loggedIn ? 
              (
                <div>
                  <Link to="/" className={classes.link} style={{marginRight:'50px'}}>
              Home
            </Link>
                <Link to="/tests" className={classes.link}>
                  Your tests
                </Link>
                </div>
                
            ):
            (
                <div>
                  <Link to="/" className={classes.link} style={{marginRight:'50px'}}>
              Home
            </Link>
              <Link to="/login" className={classes.link} >
                Login
              </Link>
              </div>
            )
            }
            
          </div>
      </Toolbar>
    </AppBar>
    {loggedIn?(
        <div style={{marginTop:'10%'}}>
        <h2 style={{margin:'10px'}}>Welcome student!</h2>
        <h3 style={{margin:'10px'}}>Please login with your student ID to begin your tests</h3>
    </div>
    ):(<div style={{marginTop:'10%'}}>
        <h2 style={{margin:'10px'}}>Welcome {(userDetails!==null)?userDetails.name:"Rishabh"}!</h2>
        <h3 style={{margin:'10px'}}>Student ID: {(userDetails!==null)?userDetails.userID:"DJSCE123"} </h3>
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
