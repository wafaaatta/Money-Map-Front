// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <img src={logo} alt="Logo" className="header-logo-image" />
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-link">Accueil</Link>
          <Link to="/transactions" className="header-link">Transactions</Link>
          <Link to="/signin" className="header-link">Se connecter</Link>
          <Link to="/signup" className="header-link">S'inscrire</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;