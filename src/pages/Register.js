import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

const Register = () => {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [initialBalance, setInitialBalance] = useState(0);

    useEffect(() => {
        ipcRenderer.on('error', (event, data) => {
            setError(data);
        });
    }, []);

    const handleChange = e => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            case 'initialBalance':
                setInitialBalance(e.target.value);
                break;
        }
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (username.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        ipcRenderer.send('register', { username, password, initialBalance });
    };
    const Error = error ? (
        <div class='alert alert-danger' role='alert'>
            {error}
        </div>
    ) : null;
    return (
        <div>
            {Error}
            <form onSubmit={handleSubmit}>
                <div class='form-group'>
                    <label>Username</label>
                    <input
                        type='text'
                        class='form-control'
                        name='username'
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div class='form-group'>
                    <label>Password</label>
                    <input
                        type='password'
                        class='form-control'
                        name='password'
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div class='form-group'>
                    <label>Confirm Password</label>
                    <input
                        type='password'
                        class='form-control'
                        name='password2'
                        value={password2}
                        onChange={handleChange}
                    />
                </div>
                <div class='form-group'>
                    <label>Initial Balance</label>
                    <input
                        type='number'
                        class='form-control'
                        name='initialBalance'
                        value={initialBalance}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' class='btn btn-primary btn-block mt-2'>
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
