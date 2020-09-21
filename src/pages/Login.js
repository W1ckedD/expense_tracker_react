import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

const Login = () => {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = e => {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    };
    const handleSubmit = e => {
        e.preventDefault();
        ipcRenderer.send('login', { username, password });
    }
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
                    <label>Username</label>
                    <input
                        type='text'
                        className='form-control'
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit' className='btn btn-primary btn-block mt-2'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
