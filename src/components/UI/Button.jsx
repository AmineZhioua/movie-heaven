import React, { Children } from 'react'


function Button({ children, onClick, onAmine }) {
    return (
        <button className='btn-toggle' onClick={onClick} >
            {children}
        </button>
    );
}




export default Button;