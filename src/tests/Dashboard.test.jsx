import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getTransactions } from '../redux/features/transactions_store';
import TableauDeBord from '../views/Dashboard.jsx';
import { store } from '../redux/store.js';

// Mock the redux store
// const mockStore = configureStore([]);
// const store = mockStore({
//   transactions_store: {
//     transactions: [
//       { id: 1, type: 'income', amount: 100, transaction_date: '2024-01-01' },
//       { id: 2, type: 'expense', amount: 50, transaction_date: '2024-01-02' },
//       { id: 3, type: 'income', amount: 200, transaction_date: '2024-01-03' },
//     ],
//   },
// });

// jest.mock('../redux/features/transactions_store.js', () => ({
//   getTransactions: jest.fn(),
// }));

describe('TableauDeBord Component', () => {
//   beforeEach(() => {
//     // store.clearActions();
//     // getTransactions.mockClear();
//   });

  it('should render the dashboard correctly', () => {
    render(
      <Provider store={store}>
        <TableauDeBord />
      </Provider>
    );

    // Check if income, expenses, and net balance cards are displayed
    expect(screen.getByText('Revenus totaux')).toBeInTheDocument();
    expect(screen.getByText('Dépenses totales')).toBeInTheDocument();
    expect(screen.getByText('Solde net')).toBeInTheDocument();

    // Check if total values are calculated correctly
    expect(screen.getByText('300 €')).toBeInTheDocument(); // 100 + 200 incomes
    expect(screen.getByText('50 €')).toBeInTheDocument();  // 50 expenses
    expect(screen.getByText('250 €')).toBeInTheDocument(); // net balance (300 - 50)
  });

  it('should call getTransactions action on page load', () => {
    render(
      <Provider store={store}>
        <TableauDeBord />
      </Provider>
    );

    // Ensure the getTransactions action was dispatched
    expect(getTransactions).toHaveBeenCalledTimes(1);
  });

  it('should show the correct recent transactions', () => {
    render(
      <Provider store={store}>
        <TableauDeBord />
      </Provider>
    );

    // Check if recent transactions are rendered correctly
    const transactionItems = screen.getAllByText(/Revenu|Dépense/);
    expect(transactionItems.length).toBe(3 * 2); // 3 transactions
  });

  it('should navigate when the "Voir toutes les transactions" link is clicked', () => {
    render(
      <Provider store={store}>
        <TableauDeBord />
      </Provider>
    );

    // Simulate clicking on the "Voir toutes les transactions" link
    const transactionsLink = screen.getByText('Voir toutes les transactions');
    fireEvent.click(transactionsLink);

    // Expect the link to point to the correct URL
    expect(transactionsLink.closest('a')).toHaveAttribute('href', '/transactions');
  });
});
