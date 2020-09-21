import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';

const AddTransaction = ({ userId }) => {
    const history = useHistory();
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        if (!type) {
            setError('Please select a type');
            return;
        }
        if (!title) {
            setError('Please enter a title');
            return;
        }
        if (!amount) {
            setError('Please enter an amount');
            return;
        }
        const transaction = {
            userId,
            type,
            title,
            amount,
        };
        if (date) {
            transaction['date'] = date;
        }
        ipcRenderer.send('add-transaction', {
            transaction: JSON.stringify(transaction),
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
            case 'amount':
                setAmount(e.target.value);
                break;
            case 'date':
                setDate(e.target.value);
                break;
        }
    };

    ipcRenderer.on('transaction-added', (event, data) => {
        history.replace('/transactions');
    })
    const Error = error ? (
        <div className='alert alert-danger' role='alert'>
            {error}
        </div>
    ) : null;

    return (
        <div>
            {Error}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Type</label>
                    <select
                        className='form-control'
                        name='type'
                        value={type}
                        onChange={handleChange}
                    >
                        <option value='' disabled>
                            Select a type
                        </option>
                        <option value='purchase'>Purchase</option>
                        <option value='income'>Income</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Title</label>
                    <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={title}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Amount</label>
                    <input
                        type='number'
                        className='form-control'
                        name='amount'
                        value={amount}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Date</label>
                    <input
                        type='date'
                        className='form-control'
                        name='date'
                        value={date}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type='submit'
                    className='btn btn-primary btn-block mt-2'
                >
                    Add Transaction
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;
