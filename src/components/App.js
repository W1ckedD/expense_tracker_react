import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { ipcRenderer } from 'electron';

// Componenst
import Navbar from './Navbar';

// Pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import Main from '../pages/Main';
import Transactions from '../pages/Transactions';
import AddTransaction from '../pages/AddTransaction';

const App = () => {
    const [isLoggedIn, setIsloggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const id = localStorage.getItem('userId');
        if (id) {
            setUserId(id);
            setIsloggedIn(true);
        }

        ipcRenderer.on('user-registered', (event, data) => {
            const user = JSON.parse(data.user);
            localStorage.setItem('userId', user._id);
            setUserId(user._id);
            setIsloggedIn(true);
        });
        ipcRenderer.on('user-logged-in', (event, data) => {
            const user = JSON.parse(data.user);
            localStorage.setItem('userId', user._id);
            setUserId(user._id);
            setIsloggedIn(true);
        });
    }, []);
    const logout = () => {
        localStorage.removeItem('userId');
        setIsloggedIn(false);
    };

    if (!isLoggedIn) {
        return (
            <Router>
                <Navbar isLoggedIn={isLoggedIn} logout={logout} />
                <div className='container'>
                    <Switch>
                        <Route exact path='/register'>
                            <Register />
                        </Route>
                        <Route exact path='/'>
                            <Login />
                        </Route>
                        <Redirect to='/' />
                    </Switch>
                </div>
            </Router>
        );
    }
    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} logout={logout} />
            <div className='container'>
                <Switch>
                    <Route exact path="/add-transaction">
                        <AddTransaction userId={userId} />
                    </Route>
                    <Route exact path='/transactions'>
                        <Transactions userId={userId} />
                    </Route>
                    <Route exact path='/'>
                        <Main userId={userId}/>
                    </Route>
                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
