import React, {useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'
import { Button } from './Button';
import { ReactComponent as Logo } from '../assets/theMet.svg';
import { ReactComponent as Close } from '../assets/close.svg';
import { ReactComponent as Menu } from '../assets/menu.svg';

function Navbar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  };

  // TODO: when window > 960, reset mobile menu

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'  onClick={closeMobileMenu}>
            <Logo className='logo'/>
          </Link>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/tour' className='nav-links' onClick={closeMobileMenu}>
                Tour
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/art-collection' className='nav-links' onClick={closeMobileMenu}>
                Art Collection
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/education' className='nav-links' onClick={closeMobileMenu}>
                Education
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='nav-links-mobile' className='nav-links-mobile' onClick={closeMobileMenu}> 
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='nav-links-mobile' className='nav-links-mobile' onClick={closeMobileMenu}> 
                Login
              </Link>
            </li>
          </ul>
          <div className= "button-group">
            {/* consider modifying button.css to include specific style for navbar */}
            {button && <Button buttonStyle='btn--nav'>Sign up</Button>}
            {button && <Button buttonStyle='btn--nav-outline'>Login</Button>}
          </div>
          <div className='menu-icon' onClick={handleClick}>
            {click ? (<Close/>) : (<Menu/>)}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar