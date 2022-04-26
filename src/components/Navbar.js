import React, {useState, useEffect} from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import userimg from '../assets/userimg.jpeg'
import {

    AccountBox,

} from '@material-ui/icons'


const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: '45%',
        margin: 'auto'
    },
    navlinks: {
        display: 'flex',
        justifyContent: 'center'
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    link: {
        textDecoration: 'none',
        lineStyle: 'none',
        fontWeight: 'bold',
        color: "white",
        width: '200px',
        fontSize: "16px",
        "&:hover": {
            color: "lightblue",
            fontSize: 'large'
        },

    },
    user: {
        fontFamily: 'Noto Serif Display',
        fontWeight: 'bold',
        padding: '7px',
        border: '1px solid lightgray',
        borderRadius: '5px'

    }

}));
const img_style = {
    height: '30px',
    width: '30px',
    borderRadius: '5px',
    marginRight: '2px'
}
const iconStyles = {
    color: 'white',
    fontSize: '30px',
    marginRight: '5%'
}
const accountTag = {
    fontFamily: 'Noto Serif Display',
    color: 'white',
    fontWeight: 'bold',

}

export default function Navbar() {
    const student_details = JSON.parse(
        localStorage.getItem('user_details')
    )

    const classes = useStyles();
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        //make your login request here
    })
    return (
        <>
            <AppBar position="static" style={{backgroundColor: 'black'}}>
                <Toolbar style={{width: '100%'}}>
                    <div className={classes.title}>
                        <Link to="/" className={classes.link} style={{
                            fontFamily: 'Noto Serif Display', fontWeight: 'bold',
                            fontSize: '24px'
                        }}>
                            Honest Grade
                        </Link>

                    </div>
                    <div className={classes.user}>
                        {student_details === null ? (
                                <div>
                                    <Link to="/login" className={classes.link} style={{marginRight: '10%'}}>
                                        Login
                                    </Link>
                                </div>
                            ) :
                            (
                                <Link to="/account" className={classes.link} style={{marginRight: '5%'}}>
              <span>
              <AccountBox
                  style={iconStyles}
              />
              </span>

                                    Welcome {student_details.userID}

                                </Link>
                            )}
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

