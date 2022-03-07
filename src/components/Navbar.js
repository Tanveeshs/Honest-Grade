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
  display:'flex',
  justifyContent:'center'    
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: 'none',
    lineStyle:'none',
    fontWeight:'bold',
    color: "white",
    width:'250px',
    fontSize: "16px",
    "&:hover": {
      color: "lightblue",
      fontSize:'large'
    },
  },
}));

export default function Navbar() {
  const student_details = JSON.parse(
    localStorage.getItem('user_details')
    )

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
            <Link to="/" className={classes.link} style={{marginRight:'2%',fontFamily:'Noto Serif Display',fontWeight:'bold',
          fontSize:'24px'}}>
              Honest Grade
            </Link>
            {student_details === null ? (
                <div>
              <Link to="/login" className={classes.link}  style={{marginRight:'10%'}}>
                Login
              </Link>
              </div>
            ):
            (
            <Link to="/account" className={classes.link} style={{marginRight:'10%'}}>
              Welcome {student_details.userID}
            </Link>
            )}
          </div>
      </Toolbar>
    </AppBar>
    </>
    )
            }