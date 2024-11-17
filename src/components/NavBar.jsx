import React from 'react'
import NavLogo from './NavLogo';


function NavBar({ children }) {
    return (
        <nav className="nav-bar">
            <NavLogo />
            {children}
        </nav>
    );
}




export default NavBar;