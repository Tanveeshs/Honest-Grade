import React, { useState, useEffect } from 'react';

const Card = (props) => {
    const cardStyles = {
        width:'60%',
        border:'1px solid lightgray',
        boxShadow:'2px 2px 2px lightgray',
        padding:'2%',
        borderRadius:'3px 3px 3px',
        marginBottom:'2%'
    }
    
    return ( 
        <div style={cardStyles}>
            {props.children}
        </div>
     );
}
 
export default Card;