import React, { Fragment } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

import { userRoles } from './../../constants/common';

const Navbar = () => {
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    };

    const userRole = localStorage.getItem('userRole')
        ? localStorage.getItem('userRole') : sessionStorage.getItem('userRole');
        
    return (
        <div className="Navbar">
            {
                userRole === userRoles.ADMIN ?
                <Fragment>
                    <button onClick={logout}>Logout</button>
                </Fragment>
                : userRole === userRoles.USER ?
                <Fragment>
                    <button onClick={logout}>Logout</button>
                </Fragment>
                :
                <Fragment>
                    <Link to="/register">Register</Link>
                    <br />
                    <Link to="/login">Login</Link>
                </Fragment>
            }
        </div>
        );
};

export default Navbar;
