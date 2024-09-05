import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { ArrowUpIcon, ArrowDownIcon, BellIcon, CreditCardIcon, WalletIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

ChartJS.register(...registerables);

const TableauDeBord = () => {
  const [moisActuel, setMoisActuel] = useState('Mai');

  // Données fictives pour les graphiques
  const donneesRevenusVsDepenses = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Revenus',
        data: [3100, 4000, 2800, 5100, 4200, 3800, 3200],
        borderColor: 'rgb(74, 222, 128)',
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Dépenses',
        data: [2300, 3100, 2900, 3900, 3000, 3500, 2700],
        borderColor: 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(248, 113, 113, 0.5)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const donneesTypesTransactions = {
    labels: ['Revenus', 'Dépenses'],
    datasets: [
      {
        data: [4000, 3000],
        backgroundColor: ['rgba(74, 222, 128, 0.8)', 'rgba(248, 113, 113, 0.8)'],
        hoverBackgroundColor: ['rgba(74, 222, 128, 1)', 'rgba(248, 113, 113, 1)'],
      },
    ],
  };

  const donneesCategories = {
    labels: ['Alimentation', 'Transport', 'Loisirs', 'Santé', 'Éducation', 'Autres'],
    datasets: [
      {
        label: 'Dépenses par catégorie',
        data: [1200, 800, 600, 400, 300, 700],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="">
        <main>
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <ArrowUpIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Revenus totaux</dt>
                          <dd className="text-3xl font-semibold text-gray-900">23 000 €</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Voir tous les revenus</a>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                        <ArrowDownIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Dépenses totales</dt>
                          <dd className="text-3xl font-semibold text-gray-900">18 000 €</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Voir toutes les dépenses</a>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <WalletIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Solde net</dt>
                          <dd className="text-3xl font-semibold text-gray-900">5 000 €</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Voir le détail du solde</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Revenus vs Dépenses</h3>
                  <div className="mt-5 h-80">
                    <Line data={donneesRevenusVsDepenses} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Types de transactions</h3>
                    <div className="mt-5 h-64">
                      <Doughnut data={donneesTypesTransactions} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Dépenses par catégorie</h3>
                    <div className="mt-5 h-64">
                      <Bar data={donneesCategories} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Transactions récentes</h3>
                  <div className="mt-5">
                    <ul className="divide-y divide-gray-200">
                      {[
                        { id: 1, nom: 'Supermarché', montant: -85.20, date: '2023-05-15' },
                        { id: 2, nom: 'Salaire', montant: 2500, date: '2023-05-01' },
                        { id: 3, nom: 'Restaurant', montant: -45.50, date: '2023-05-10' },
                        { id: 4, nom: 'Essence', montant: -60.00, date: '2023-05-08' },
                      ].map((transaction) => (
                        <li key={transaction.id} className="py-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCardIcon className="h-6 w-6 text-gray-400" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{transaction.nom}</p>
                              <p className="text-sm text-gray-500">{transaction.date}</p>
                            </div>
                          </div>
                          <div className={`text-sm font-semibold ${transaction.montant > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.montant > 0 ? '+' : ''}{transaction.montant.toFixed(2)} €
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Voir toutes les transactions<span aria-hidden="true"> &rarr;</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TableauDeBord;