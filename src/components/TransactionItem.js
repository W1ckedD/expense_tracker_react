import React from 'react';
import { ipcRenderer } from 'electron';
import moment from 'moment';

const TransactionItem = ({ transaction, index }) => {
    const handleDelete = () => {
        ipcRenderer.send('delete-transaction', {
            userId: transaction.userId,
            transactionId: transaction._id,
        });
    };

    return (
        <tr>
            <th scope='row'>{index + 1}</th>
            <td>
                {transaction.type
                    .charAt(0)
                    .toUpperCase()
                    .concat(transaction.type.slice(1))}
            </td>
            <td>{transaction.title}</td>
            <td
                className={
                    transaction.type === 'income'
                        ? 'text-success'
                        : 'text-danger'
                }
            >
                {transaction.amount} $
            </td>
            <td>{moment(transaction.date).format('MMMM Do YYYY')}</td>
            <td>
                <button
                    className='btn btn-danger btn-sm'
                    onClick={handleDelete}
                >
                    X
                </button>
            </td>
        </tr>
    );
};

export default TransactionItem;
