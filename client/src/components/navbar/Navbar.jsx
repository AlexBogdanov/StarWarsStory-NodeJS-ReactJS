import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Login from './../login/Login';
// import Register from './../register/Register';

const Navbar = ({ user, setUser }) => {
    return (
        <div className="Navbar">(
            <Fragment>
                <Link to="/login">login</Link>
                <Link to="/register">register</Link>
            </Fragment>

            <Switch>
                <Route path="/login" render={() => <Login setUser={setUser} />} />
                {/* <Route path="/register" component={Register} /> */}
            </Switch>
        </div>
    );
};

export default Navbar;
