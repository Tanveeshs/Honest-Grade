import React,{useState} from "react";
import {TextField,Button} from '@material-ui/core'
import Navbar from './Navbar'

export default function Login () {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [studentID,setStudentID] = useState('')
        const formStyles = {
            display:'flex',
            flexDirection:'column',
            padding:'10px',
            width:'30%',
            marginLeft:'10%'
        }
        const buttonGroupStyles = {
            display:'flex',
            width:'30%',
            flexDirection:'row',
            justifyContent:'space-between',
            marginLeft:'10%',
            marginTop:'5%'
        }
        const handleLogin = (e) =>{
            //verify login
        }
        const changeFirstName = (e) =>{
            setFirstName(e.target.value)
        }
        const changeLastName = (e) =>{
            setLastName(e.target.value)
        }
        const changeStudentID = (e) =>{
            setStudentID(e.target.value)
        }
        return (
            <>
            <Navbar />
            <div>
                <form style={formStyles}>
                    <h3>Student Details</h3>
                    <TextField value={firstName} label="First Name" variant="filled" required onChange={changeFirstName}/>
                    <TextField value={lastName} label="Last Name" variant="filled" required onChange={changeLastName}/>
                    <TextField value={studentID} label="Student ID" variant="filled" required onChange={changeStudentID}/>
                </form>
                <div style={buttonGroupStyles}>
                <Button variant="contained">
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" size="medium">
                    Login
                </Button>
                </div>
            </div>
            </>

        );
    
}