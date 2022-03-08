import React,{useState,useEffect} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
//styles
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
const sidebarItem = {
  marginTop:'2%',
  cursor:'pointer',
}

function DashboardStart() {
  const student_details = JSON.parse(localStorage.getItem('user_details'))
  const classes = useStyles();
  const [userDetails, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(student_details)
  //functions
  const nav = useHistory()

  const takeToTests = () => {
    nav.replace('/tests')
  }
  const takeToAssn = () => {
    nav.replace('/assn')
  }
  const takeToAcc = () => {
    nav.replace('/account')
  }
  useEffect(()=>{
      if(student_details){
          console.log("SET LOGGED IN")
          setLoggedIn(true)
      }
  })

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
          <h5 onClick={takeToTests} style={sidebarItem}>Tests</h5>
          <h5 onClick={takeToAssn} style={sidebarItem}>Assignments</h5>
          <h5 onClick={takeToAcc} style={sidebarItem}>Account</h5>
          <h5 style={sidebarItem}>Other</h5>
          </div>
        </div>
      </div>
      <AppBar position="static" style={{backgroundColor:'black'}}>
      <CssBaseline />
      <Toolbar>
          <div className={classes.navlinks} style={{marginLeft:"40%"}}>
            
            {loggedIn ? 
              (
                <div>
                  <Link to="/" className={classes.link} style={{marginRight:'50px'}}>
                Home
            </Link>
                <Link to="/tests" className={classes.link}>
                  Welcome {student_details.userID}
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
    {!loggedIn?(
        <div style={{marginTop:'10%',marginLeft:'40%'}}>
        <h2 style={{margin:'10px'}}>Welcome student!</h2>
        <h3 style={{margin:'10px'}}>Please login with your student ID to begin your tests</h3>
    </div>
    ):(<div style={{marginTop:'10%',marginLeft:'40%'}}>
        <h2 style={{margin:'10px'}}>Welcome {(userDetails!==null)?student_details.name:"Rishabh"}!</h2>
        <h3 style={{margin:'10px'}}>Student ID: {(userDetails!==null)?student_details.userID:"DJSCE123"} </h3>
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
