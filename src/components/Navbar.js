import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, logout }) => {
    if (!isLoggedIn) {
        return (
            <nav className='navbar navbar-expand navbar-dark bg-primary'>
                <Link className='navbar-brand' to='/'>
                    Expense Tracker
                </Link>
                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'
                >
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>
                                Login
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/register'>
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
    return (
        <nav className='navbar navbar-expand navbar-dark bg-primary'>
            <Link className='navbar-brand' to='/'>
                Expense Tracker
            </Link>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                <ul className='navbar-nav mr-auto'>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/'>
                            Main
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/transactions'>
                            Transactions
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <button
                            className='btn btn-primary text-light'
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
