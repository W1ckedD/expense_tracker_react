import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

import BarChart from '../components/BarChart';

const Main = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const date = new Date();
    const startDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).toDateString();

    const endDate = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).toDateString();

    useEffect(() => {
        ipcRenderer.send('get-user', { userId });
        ipcRenderer.send('get-user-transactions-by-date', {
            userId,
            startDate,
            endDate,
        });
        ipcRenderer.on('user-sent', (event, data) => {
            setUser(JSON.parse(data.user));
        });
        ipcRenderer.on('user-transactions-sent', (event, data) => {
            const tsx = JSON.parse(data.transactions);
            setTransactions(tsx);
        });
    }, []);

    if (!user) {
        return <h3>Loading ...</h3>;
    }

    return (
        <div>
            <h2>Hello {user ? user.username : ''} </h2>
            <h4>
                Your balance:{' '}
                {user ? (
                    <span
                        className={
                            user.balance > 0 ? 'text-success' : 'text-danger'
                        }
                    >
                        {user.balance} $
                    </span>
                ) : (
                    ''
                )}
                
            </h4>
            <BarChart
                transactions={transactions}
                startDateString={startDate}
                endDateString={endDate}
            />
        </div>
    );
};

export default Main;
