import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--nav', 'btn--nav-outline', 'btn--landing', 'btn--login-signup']

export const Button = ({children, onClick, buttonStyle, to, ariaLabel, type = 'button'}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

    // If it's a submit button within a form, don't wrap it in Link
    if (type === 'submit') {
        return (
            <button 
                className={`btn ${checkButtonStyle}`} 
                aria-label={ariaLabel} 
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        );
    }

    // For navigation buttons, keep the Link wrapper
    if (to) {
        return (
            <Link to={to} style={{width: '100%', display: 'block'}}>
                <button 
                    className={`btn ${checkButtonStyle}`} 
                    aria-label={ariaLabel} 
                    onClick={onClick}
                    type={type}
                >
                    {children}
                </button>
            </Link>
        );
    }

    return (
        <button 
            className={`btn ${checkButtonStyle}`} 
            aria-label={ariaLabel} 
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}