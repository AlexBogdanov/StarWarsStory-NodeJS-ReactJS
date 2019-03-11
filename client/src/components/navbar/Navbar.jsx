import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Register from './../register/Register';

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
            </Switch>
        </div>
    );
};

export default Navbar;
