import React from 'react';

import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions }) => {
    if (transactions.length === 0) {
        return <h3>No transactions found</h3>;
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Type</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Date</th>
                    <th scope='col' />
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction, index) => (
                    <TransactionItem key={transaction._id} transaction={transaction} index={index} />
                ))}
            </tbody>
        </table>
    );
};

export default TransactionList;
