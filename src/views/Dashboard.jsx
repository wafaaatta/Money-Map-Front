import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { ArrowUpIcon, ArrowDownIcon, BellIcon, CreditCardIcon, WalletIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../redux/features/transactions_store';

ChartJS.register(...registerables);

const TableauDeBord = () => {
  const [moisActuel, setMoisActuel] = useState('Mai');

  const dispatch = useDispatch();
  const {transactions} = useSelector((state) => state.transactions_store);

  useEffect(() => {
    dispatch(getTransactions())
  }, [dispatch])

  // Données fictives pour les graphiques
  const donneesRevenusVsDepenses = {
    labels: transactions.map(transaction => transaction.transaction_date),
    datasets: [
      {
        label: 'Revenus',
        data: transactions.filter(transaction => transaction.type === 'income').map(transaction => +transaction.amount),
        borderColor: 'rgb(74, 222, 128)',
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Dépenses',
        data: transactions.filter(transaction => transaction.type === 'expense').map(transaction => +transaction.amount),
        borderColor: 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(248, 113, 113, 0.5)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const incomes = transactions.filter((transaction) => transaction.type === 'income')
  const expenses = transactions.filter((transaction) => transaction.type === 'expense')

  const incomesTotal = incomes.reduce((acc, transaction) => acc + +transaction.amount, 0)
  const expensesTotal = expenses.reduce((acc, transaction) => acc + +transaction.amount, 0)

  const donneesTypesTransactions = {
    labels: ['Revenus', 'Dépenses'],
    datasets: [
      {
        data: [incomesTotal, expensesTotal],
        backgroundColor: ['rgba(74, 222, 128, 0.8)', 'rgba(248, 113, 113, 0.8)'],
        hoverBackgroundColor: ['rgba(74, 222, 128, 1)', 'rgba(248, 113, 113, 1)'],
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
                          <dd className="text-3xl font-semibold text-gray-900">{incomesTotal} €</dd>
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
                          <dd className="text-3xl font-semibold text-gray-900">{expensesTotal} €</dd>
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
                          <dd className="text-3xl font-semibold text-gray-900">{incomesTotal - expensesTotal} €</dd>
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

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Types de transactions</h3>
                    <div className="mt-5 h-64">
                      <Doughnut data={donneesTypesTransactions} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                </div>
                <div className=" bg-white h-96 overflow-auto custom-scroll shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Transactions récentes</h3>
                  <div className="mt-5">
                    <ul className="divide-y divide-gray-200">
                      {transactions.slice(0, 5).map((transaction) => (
                        <li key={transaction.id} className="py-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCardIcon className="h-6 w-6 text-gray-400" />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{transaction.type == 'income' ? 'Revenu' : 'Dépense'}</p>
                              <p className="text-sm text-gray-500">{transaction.transaction_date}</p>
                            </div>
                          </div>
                          <div className={`text-sm font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} €
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a href="/transactions" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Voir toutes les transactions<span aria-hidden="true"> &rarr;</span></a>
                  </div>
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