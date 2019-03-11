import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Register from './../register/Register';
import Login from './../login/Login';

const Navbar = () => {
    const user = localStorage.getItem('user');

    return (
        <div className="Navbar">
            <Fragment>
                <Link to="/login">login</Link>
                <Link to="/register">register</Link>
            </Fragment>

            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    );
};

export default Navbar;
