import React, { useState, useEffect } from 'react';

const Card = (props) => {
    const cardStyles = {
        width:'40vw',
        height:'15vh',
        // display:'flex',
        // alignItems:'center',
        // justifyContent:'flex-start',
        border:'1px solid lightgray',
        boxShadow:'0 0 2px lightgray'
    }
    
    return ( 
        <div style={cardStyles}>
            {props.children}
        </div>
     );
}
 
export default Card;