import React, { useState, useEffect } from 'react';
import userimg from '../assets/userimg.jpeg'
import Navbar from './Navbar'

const Account = () => {
    const student_details = JSON.parse(localStorage.getItem('user_details'))
    const {userID,name} = student_details
    
    //styles
    const container = {
        height:'auto',
        width:'50%',
        margin:'auto',
        padding:'5%',
        borderRadius:'10px',
        border:'1px solid lightgray',
        boxShadow:'1px 1px 1px lightgray',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
    }
    const img_style = {
        height:'80px',
        width:'80px',
        marginBottom:'5%'
    }

    return ( 
        <>
        <Navbar/>
         <div style={container}>
            <div>
                <img src={userimg} style={img_style} alt="no_img"/>
            </div>
            <h2>Account Details</h2>
            <p>Name: {name}</p>
            <p>Portal Username: {userID}</p>
        </div>
        </>
       
     );
}
 
export default Account;