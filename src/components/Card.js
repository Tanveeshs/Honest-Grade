import React, { useState, useEffect } from 'react';

const Card = (props) => {
    const cardStyles = {
        width:'35vw',
        border:'1px solid lightgray',
        boxShadow:'3px 3px 3px lightgray',
        padding:'2%',
        borderRadius:'10px 10px 10px',
        marginBottom:'2%',
        backgroundColor:'#32a6c9',
        marginRight:'3%',
        fontFamily:'Noto Serif Display'
    }
    
    return ( 
        <div style={cardStyles}>
            {props.children}
        </div>
     );
}
 
export default Card;