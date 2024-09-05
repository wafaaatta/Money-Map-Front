// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Assure-toi de créer ce fichier pour le style si nécessaire

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} Application de Gestion de Transactions. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
