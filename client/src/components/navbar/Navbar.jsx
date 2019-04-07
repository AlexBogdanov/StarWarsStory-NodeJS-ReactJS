import React, { Component, Fragment } from 'react';
import './Navbar.scss';
import { Link, Switch, Route } from 'react-router-dom';

import AdminRoutes from './../../routes/admin-routes';
import AuthUserRoutes from './../../routes/authUser-routers';
import UnauthUserRoutes from './../../routes/unauthUser-routes';
import { userRoles } from './../../constants/common';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: '',
            isActive: false
        };

        this.logout = this.logout.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentWillMount() {
        this.setState({ userRole: localStorage.getItem('userRole')
        ? localStorage.getItem('userRole') : sessionStorage.getItem('userRole') });
    }

    logout () {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
    }

    toggleClass() {
        this.setState(state => ({isActive: !state.isActive}));
    }

    render() {
        return (
            <div className="Navbar">
                <div id="container">
                    <div id="burger" className={(this.state.isActive) ? 'active' : 'non-active'} onClick={this.toggleClass}>
                        <div class="bun top"></div>
                        <div class="filling"></div>
                        <div class="bun bottom"></div>
                    </div>
                </div>
                {
                    this.state.userRole === userRoles.ADMIN ?
                    <nav className={(this.state.isActive) ? 'show' : 'hide'}>
                        <ul>
                            {/* Character */}
                            <li>
                                <Link to="/characters">Characters</Link>
                            </li>
                            <li class="green">
                                <Link to="/character/create">Create character</Link>
                            </li>
                            {/* Weapon */}
                            <li class="red">
                                <Link to="/weapons">Weapons</Link>
                            </li>
                            <li class="yellow">
                                <Link to="/weapon/create">Create weapon</Link>
                            </li>
                            {/* Planet */}
                            <li class="purple">
                                <Link to="/planets">Planets</Link>
                            </li>
                            <li>
                                <Link to="/planet/create">Create planet</Link>
                            </li>
                            {/* Spaceship */}
                            <li class="green">
                                <Link to="/spaceships">Spaceships</Link>
                            </li>
                            <li class="red">
                                <Link to="/spaceship/create">Create spaceship</Link>
                            </li>
                            {/* Movie */}
                            <li class="yellow">
                                <Link to="/movies">Movies</Link>
                            </li>
                            <li class="purple">
                                <Link to="/movie/create">Create movie</Link>
                            </li>
                            <li onClick={this.logout}>
                                <Link to="">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                    : this.state.userRole === userRoles.USER ?
                    <nav className={(this.state.isActive) ? 'show' : 'hide'}>
                        <ul>
                            <li>
                                <Link to="/characters">Characters</Link>
                            </li>
                            <li class="green">
                                <Link to="/planets">Planets</Link>
                            </li>
                            <li class="red">
                                <Link to="/weapons">Weapons</Link>
                            </li>
                            <li class="yellow">
                                <Link to="/spaceships">Spaceships</Link>
                            </li>
                            <li class="purple">
                                <Link to="/movies">Movies</Link>
                            </li>
                            <li onClick={this.logout}>
                                <Link to="">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                    :
                    <nav className={(this.state.isActive) ? 'show' : 'hide'}>
                        <ul>
                            <li>
                                <Link to="/characters">Characters</Link>
                            </li>
                            <li class="green">
                                <Link to="/weapons">Weapons</Link>
                            </li>
                            <li class="red">
                                <Link to="/planets">Planets</Link>
                            </li>
                            <li class="yellow">
                                <Link to="/spaceships">Spaceships</Link>
                            </li>
                            <li class="purple">
                                <Link to="/movies">Movies</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li class="green">
                                <Link to="/login">Login</Link>
                            </li>
                        </ul>
                    </nav>
                }
                {
                     this.state.userRole === userRoles.ADMIN ?
                     <AdminRoutes notifHandler={this.props.notifHandler} />
                     : this.state.userRole === userRoles.USER ?
                     <AuthUserRoutes notifHandler={this.props.notifHandler} />
                    :
                    <UnauthUserRoutes notifHandler={this.props.notifHandler} />
                }
            </div>
        );
    }
};

export default Navbar;
