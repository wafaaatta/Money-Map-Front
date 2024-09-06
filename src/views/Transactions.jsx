import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, PlusIcon, Text } from 'lucide-react';
import Modal from '../components/Modal';
import Select from '../components/select';
import { Input } from '../components/inputField';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, deleteTransaction, getTransactions } from '../redux/features/transactions_store';
import moment from 'moment/moment';
import { unwrapResult } from '@reduxjs/toolkit';
import { showNotification } from '../redux/features/notification_store';
import Button from '../components/Button';
import { BiError } from 'react-icons/bi';

const TransactionsView = () => {
  

  const [modalOuverte, setModalOuverte] = useState(false);
  const [isDeleteModalOuverte, setIsDeleteModalOuverte] = useState(false);

  const [currentTransaction, setCurrentTransaction] = useState(null);

  const [type, setType] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  const openDeleteModal = (transaction) => {
    setIsDeleteModalOuverte(true)
    setCurrentTransaction(transaction)
  }


  const handleSubmit = async () => {
    if(!type || !amount || !description) return
    
    console.log({
      type,
      amount,
      description
    });


    await dispatch(
      createTransaction({
        type,
        amount,
        description,
        transaction_date: moment().format('YYYY-MM-DD'),
      })
    ).then(unwrapResult)
    .then(() => {
      setModalOuverte(false)
      dispatch(
        showNotification({
          type: 'success',
          message: 'Transaction ajoutée',
          description: 'Votre transaction a été ajoutée',
        })
      )
    }).catch((error) => {
      const errorMessage = error.message;
      dispatch(
        showNotification({
          type: 'error',
          message: 'Erreur de connexion',
          description: errorMessage,
        })
      )
      setModalOuverte(false)
    });
    
  };

  const {transactions} = useSelector(state => state.transactions_store)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions())
  }, [dispatch])

  const handleDeleteTransaction = async () => {
    await dispatch(
      deleteTransaction(currentTransaction.id)
    ).then(unwrapResult)
    .then(() => {
      setIsDeleteModalOuverte(false)
      dispatch(
        showNotification({
          type: 'success',
          message: 'Transaction supprimée',
          description: 'Votre transaction a été supprimée',
        })
      )
    }).catch((error) => {
      const errorMessage = error.message;
      dispatch(
        showNotification({
          type: 'error',
          message: 'Erreur de connexion',
          description: errorMessage,
        })
      )
      setIsDeleteModalOuverte(false)
    });
  }
  

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="py-8">
        <main>
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
              <button
                  onClick={() => setModalOuverte(true)}
                  className="inline-flex items-center px-4 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Ajouter une transaction
                </button>
              </div>
              <table className="min-w-full border shadow">
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 border">
                    {
                      transactions.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 text-center py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                            Aucune transaction
                          </td>
                        </tr>
                      )
                    }
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
                              transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.type === 'income' ? 'Revenu' : 'Dépense'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.amount} €
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.transaction_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openDeleteModal(transaction)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Supprimer
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={modalOuverte} onClose={() => setModalOuverte(false)} title={'Ajouter une nouvelle transaction'}>
      <div className="sm:flex sm:items-start">
                  <div className=" text-center  sm:text-left w-full">
                    <div className="mt-2">
                      <div className="space-y-6">
                        <div className="">
                        <Select 
                        onChange={e => setType(e)}
                        placeholder='Catégorie'
                        className={'w-full mb-4'}
                              options={[
                                {label: 'Revenu', value: 'income'},
                                {label: 'Dépense', value: 'expense'},
                              ]}	
                            />
                          <Input 
                              label="Montant"
                              icon={Hash}
                              value={amount}
                              onChange={e => setAmount(e.target.value)}
                              helperText="Montant de la transaction"
                              placeholder="Montant"
                              type="number"
                            />
                          <div className="sm:col-span-6">
                            <Input 
                              icon={Text}
                              label="Description"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              helperText="Description de la transaction"
                              placeholder="Description"
                            />
                          </div>
                          
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <button
                          onClick={handleSubmit}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:text-sm"
                          >
                            Ajouter la transaction
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      </Modal>

      <Modal title={"Suppression de la transaction"} isOpen={isDeleteModalOuverte} onClose={() => setIsDeleteModalOuverte(false)}>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{"Etes-vous sûr de vouloir supprimer cette transaction?"}</p>
        <div className='flex items-center mt-2 p-2 bg-red-100 rounded'>
            <BiError className="w-6 h-6 text-red-600 mr-2" />
            <p className="text-sm text-red-600"> Cette action ne peut pas &ecirc;tre annul&eacute;e. </p>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button size="sm" color="gray" variant="outline" onClick={() => setIsDeleteModalOuverte(false)}>
          Annuler
        </Button>
        <Button size="sm" color="red" onClick={handleDeleteTransaction}>
          Supprimer
        </Button>
      </div>
    </Modal>
    </div>
  );
};

export default TransactionsView;



