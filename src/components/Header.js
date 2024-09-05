// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import Logo from '../assets/logo_slug.png';

const Header = () => {
  return (
    <header className="bg-white shadow">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} className='w-32' alt="Logo"/>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="#" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600">Features</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link to="#" className="text-gray-600 hover:text-blue-600">Contact</Link>
          </nav>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </div>
      </header>
  );
};

export default Header;