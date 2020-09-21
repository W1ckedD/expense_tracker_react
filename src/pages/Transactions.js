import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import TransactionList from '../components/TransactionList';

const Transactions = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        ipcRenderer.send('get-user-transactions', { userId });

        ipcRenderer.on('user-transactions-sent', (event, data) => {
            const tsx = JSON.parse(data.transactions);
            setTransactions(tsx);
        });
    }, []);
    return (
        <div>
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default Transactions;
