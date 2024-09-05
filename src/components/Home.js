// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assure-toi de créer ce fichier pour le style si nécessaire

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenue sur notre Application de Gestion de Transactions</h1>
        <p>Cette application vous permet de gérer et de visualiser vos transactions financières.</p>
      </header>

      <main className="home-main">
        <div className="home-links">
          <Link to="/signin" className="home-link">Se connecter</Link>
          <Link to="/signup" className="home-link">S'inscrire</Link>
          <Link to="/transactions" className="home-link">Voir les Transactions</Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
