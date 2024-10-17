import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--nav', 'btn--nav-outline', 'btn--landing', 'btn--login-signup']

export const Button = ({children, onClick, buttonStyle, to, ariaLabel, type = 'button'}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    const buttonElement = (
        <button 
            className={`btn ${checkButtonStyle}`} 
            aria-label={ariaLabel} 
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );

    if (to) {
        return <Link to={to} style={{width: '100%', display: 'block'}}>{buttonElement}</Link>;
    }

    return buttonElement;
}