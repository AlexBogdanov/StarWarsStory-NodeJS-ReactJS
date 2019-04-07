import React, { Fragment } from 'react';
import './Navbar.css';
import { Link, Switch, Route } from 'react-router-dom';

import AdminRoutes from './../../routes/admin-routes';
import AuthUserRoutes from './../../routes/authUser-routers';
import UnauthUserRoutes from './../../routes/unauthUser-routes';
import { userRoles } from './../../constants/common';

const Navbar = ({ notifHandler }) => {
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
                        {/* Character */}
                        <Link to="/characters">Characters</Link>
                        <br />
                        <Link to="/character/create">Create character</Link>
                        <br />

                        {/* Weapon */}
                        <Link to="/weapons">Weapons</Link>
                        <br />
                        <Link to="/weapon/create">Create weapon</Link>
                        <br />

                        {/* Planet */}
                        <Link to="/planets">Planets</Link>
                        <br />
                        <Link to="/planet/create">Create planet</Link>
                        <br />

                        {/* Spaceship */}
                        <Link to="/spaceships">Spaceships</Link>
                        <br />
                        <Link to="/spaceship/create">Create spaceship</Link>
                        <br />

                        {/* Movie */}
                        <Link to="/movies">Movies</Link>
                        <br />
                        <Link to="/movie/create">Create movie</Link>
                        <br />

                        <button onClick={logout}>Logout</button>
                        
                        <AdminRoutes notifHandler={notifHandler} />
                    </Fragment>
                    : userRole === userRoles.USER ?
                        <Fragment>
                            <Link to="/characters">Characters</Link>
                            <br />
                            <Link to="/planets">Planets</Link>
                            <br />
                            <Link to="/weapons">Weapons</Link>
                            <br />
                            <Link to="/spaceships">Spaceships</Link>
                            <br />
                            <Link to="/movies">Movies</Link>
                            <br />
                            <button onClick={logout}>Logout</button>

                            <AuthUserRoutes notifHandler={notifHandler} />
                        </Fragment>
                        :
                        <Fragment>
                            <Link to="/characters">Characters</Link>
                            <br />
                            <Link to="/weapons">Weapons</Link>
                            <br />
                            <Link to="/planets">Planets</Link>
                            <br />
                            <Link to="/spaceships">Spaceships</Link>
                            <br />
                            <Link to="/movies">Movies</Link>
                            <br />
                            <Link to="/register">Register</Link>
                            <br />
                            <Link to="/login">Login</Link>

                            <UnauthUserRoutes notifHandler={notifHandler} />
                        </Fragment>
            }
        </div>
    );
};

export default Navbar;
