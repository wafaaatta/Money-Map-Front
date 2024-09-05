import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';
import { useDispatch } from 'react-redux';
import { showNotification } from '../redux/features/notification_store';
import { loginUser } from '../redux/features/auth_store';
import { unwrapResult } from '@reduxjs/toolkit';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gererSoumission = async (e) => {
    e.preventDefault();
   await  dispatch(
        loginUser({ email, password: motDePasse })
    ).then(unwrapResult)
    .then(() => {
        dispatch(
            showNotification({
              type: 'success',
              message: 'Connexion reussie',
              description: 'Vous avez connecté à votre compte',
            })
        )

        navigate('/dashboard')
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch(
        showNotification({
          type: 'error',
          message: 'Erreur de connexion',
          description: errorMessage,
        })
    )
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Connectez-vous à votre compte</h2>
            <p className="mt-2 text-sm text-gray-600">
              Ou{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                créez un nouveau compte
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={gererSoumission} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Adresse e-mail
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"          alt="Gestion financière"
        />
      </div>
      <Notification />
    </div>
  );
};

export default Login;