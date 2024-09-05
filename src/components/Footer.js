// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800">
      <div className="max-w-8xl mx-auto p-4">
        <p className="text-white text-center">© {new Date().getFullYear()} Application de Gestion de Transactions. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
