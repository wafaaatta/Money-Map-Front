import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, X } from 'lucide-react';
import Modal from '../components/Modal';
import Select from '../components/select';
import { Input } from '../components/inputField';
import DatePicker from 'react-datepicker';
import { Card } from '../components/Card';

const categories = [
  'Alimentation', 'Transport', 'Logement', 'Loisirs', 'Santé', 'Éducation', 'Autres'
];

const TransactionsView = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'revenu', montant: 1000, description: 'Salaire', date: '2023-05-01', categorie: 'Autres' },
    { id: 2, type: 'depense', montant: 50, description: 'Courses', date: '2023-05-02', categorie: 'Alimentation' },
    { id: 3, type: 'depense', montant: 100, description: 'Factures', date: '2023-05-03', categorie: 'Logement' },
    { id: 4, type: 'revenu', montant: 200, description: 'Freelance', date: '2023-05-04', categorie: 'Autres' },
  ]);

  const [nouvelleTransaction, setNouvelleTransaction] = useState({
    type: 'revenu',
    montant: 0,
    description: '',
    date: '',
    categorie: 'Autres',
  });

  const [modalOuverte, setModalOuverte] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = transactions.length + 1;
    setTransactions((prev) => [...prev, { ...nouvelleTransaction, id, montant: Number(nouvelleTransaction.montant) }]);
    setNouvelleTransaction({ type: 'revenu', montant: 0, description: '', date: '', categorie: 'Autres' });
    setModalOuverte(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="py-8">
        <main>
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
            <div className="">

              <Card
                title={'Transactions'}
                headerAction={
                  <button
                  onClick={() => setModalOuverte(true)}
                  className="inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Ajouter une transaction
                </button>
                }
              >
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 shadow border rounded">
                    <tr className='border'>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 border">
                    {transactions.map((transaction) => (
                      <motion.tr
                        key={transaction.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='border'
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.type === 'revenu' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.type === 'revenu' ? 'Revenu' : 'Dépense'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.montant.toFixed(2)} €
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={modalOuverte} onClose={() => setModalOuverte(false)}>
      <div className="sm:flex sm:items-start">
                  <div className=" text-center  sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Ajouter une nouvelle transaction
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="">
                        <Select 
                        placeholder='Catégorie'
                        className={'w-full mb-4'}
                              options={[
                                {label: 'Revenu', value: 'revenu'},
                                {label: 'Dépense', value: 'depense'},
                              ]}	
                            />
                          <Input 
                              label="Montant"
                              helperText="Montant de la transaction"
                              placeholder="Montant"
                              type="number"
                            />
                          <div className="sm:col-span-6">
                            <Input 
                              label="Description"
                              helperText="Description de la transaction"
                              placeholder="Description"
                            />
                          </div>
                          
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <button
                            type="submit"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                          >
                            Ajouter la transaction
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
      </Modal>
    </div>
  );
};

export default TransactionsView;