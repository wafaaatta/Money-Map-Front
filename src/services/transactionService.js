import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/transactions'; 

// Fonction pour récupérer toutes les transactions
export const getTransactions = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/transactions');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des transactions", error);
        return [];
    }
};

// Fonction pour récupérer les transactions filtrées
export const filterTransactions = async (filters) => {
    try {
        const response = await axios.post(`${"http://127.0.0.1:8000/api/transactions"}/filter`, filters);
        return response.data;
    } catch (error) {
        console.error("Erreur lors du filtrage des transactions", error);
        return [];
    }
};
