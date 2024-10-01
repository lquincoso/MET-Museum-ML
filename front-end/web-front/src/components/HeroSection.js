import React from 'react'
import '../App.css'
import './HeroSection.css'
import { ReactComponent as Logo } from '../assets/theMet.svg';

function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='headings'>
      <Logo className='main-logo'></Logo>
      <h1>Discover Art Like Never Before</h1>
      </div>
    </div>
  )
}

export default HeroSection