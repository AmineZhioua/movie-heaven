import React, { useState } from 'react'
import Button from './Button';


function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className='box'>
            <Button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "-" : "+"}
            </Button>
            {isOpen && children}
        </div>
    );
}




export default Box;