// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo_slug.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/auth_store';

const Header = () => {
  const {isAuthenticated, user} = useSelector((state) => state.auth_store)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} className='w-20' alt="Logo"/>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Accueil</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Tableau de bord</Link>
            <Link to="/transactions" className="text-gray-600 hover:text-blue-600">Transactions</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <div className="text-gray-600">
                  Bonjour <span className="font-semibold text-blue-500">{user.username}</span>
                </div>
                <p onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700">Se d&eacute;connecter</p>
              </>
            )}

            {
              !isAuthenticated && (
                <>
                  <Link to="/signin" className="text-gray-600 hover:text-blue-600">Se connecter</Link>
                  <Link to="/register" className="text-gray-600 hover:text-blue-600">S'enregistrer</Link>
                </>
              )
            }
          </div>
        </div>
      </header>
  );
};

export default Header;
