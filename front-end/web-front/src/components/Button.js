import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
const STYLES = ['btn--nav', 'btn--nav-outline', 'btn--landing'];

export const Button = ({children, onClick, buttonStyle, to, ariaLabel}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    return (
        <Link to={to}>            <button 
                className={`btn ${checkButtonStyle}`} 
                aria-label={ariaLabel} onClick={onClick}>
                {children}
            </button>
        </Link>
        
    )
}