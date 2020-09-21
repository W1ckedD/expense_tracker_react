import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import TransactionList from '../components/TransactionList';

const Transactions = ({ userId }) => {
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        ipcRenderer.send('get-user-transactions', { userId });

        ipcRenderer.on('user-transactions-sent', (event, data) => {
            const tsx = JSON.parse(data.transactions);
            setTransactions(tsx);
        });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        ipcRenderer.send('transaction-advanced-search', {
            userId,
            startDate: startDate ? startDate : null,
            endDate: endDate ? endDate : null,
            title,
            type: type ? type : null,
        });
    };
    const handleChange = e => {
        switch (e.target.name) {
            case 'type':
                setType(e.target.value);
                break;
            case 'title':
                setTitle(e.target.value);
                break;
            case 'startDate':
                setStartDate(e.target.value);
                break;
            case 'endDate':
                setEndDate(e.target.value);
                break;
        }
    };
    return (
        <div>
            <div className='d-flex justify-content-between mt-2'>
                <h3>Transactions</h3>
                <Link to='/add-transaction' className='btn btn-primary btn-lg'>
                    +
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-between p-2'>
                    <div className='form-group'>
                        <label>Type</label>
                        <select
                            className='form-control'
                            name='type'
                            value={type}
                            onChange={handleChange}
                        >
                            <option value=''>All Types</option>
                            <option value='purchase'>Purchase</option>
                            <option value='income'>Income</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Title</label>
                        <input
                            className='form-control'
                            type='text'
                            name='title'
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Start Date</label>
                        <input
                            className='form-control'
                            type='date'
                            name='startDate'
                            value={startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>End Date</label>
                        <input
                            className='form-control'
                            type='date'
                            name='endDate'
                            value={endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    className='btn btn-primary btn-block mt-2'
                >
                    Search
                </button>
            </form>
            <TransactionList transactions={transactions} />
        </div>
    );
};

export default Transactions;
