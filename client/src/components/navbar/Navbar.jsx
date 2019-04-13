import React, { Component, Fragment } from 'react';
import './Navbar.css';
import { Link, Switch, Route } from 'react-router-dom';
import {
    MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBModal,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from 'mdbreact';

import AdminRoutes from './../../routes/admin-routes';
import AuthUserRoutes from './../../routes/authUser-routers';
import UnauthUserRoutes from './../../routes/unauthUser-routes';
import { userRoles, componentsTypes } from './../../constants/common';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: '',
            isActive: false,
            isOpen: false,
            openLogin: false,
            openRegister: false,
            openCharacterCreate: false,
            openWeaponCreate: false,
            openSpaceshipCreate: false,
            openPlanetCreate: false,
            openMovieCreate: false
        };

        this.logout = this.logout.bind(this);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
        this.toggleCharacter = this.toggleCharacter.bind(this);
        this.toggleWeapon = this.toggleWeapon.bind(this);
        this.toggleSpaceship = this.toggleSpaceship.bind(this);
        this.togglePlanet = this.togglePlanet.bind(this);
        this.toggleMovie = this.toggleMovie.bind(this);
    }

    componentWillMount() {
        this.setState({ userRole: localStorage.getItem('userRole')
        ? localStorage.getItem('userRole') : sessionStorage.getItem('userRole') });
    }

    toggleCollapse() {
        this.setState((state) => ({ isOpen: !state.isOpen }));
    }

    toggleLogin() {
        this.setState((state) => ({ openLogin: !state.openLogin }));
    }

    toggleRegister() {
        this.setState((state) => ({ openRegister: !state.openRegister }));
    }

    toggleCharacter() {
        this.setState((state) => ({ openCharacterCreate: !state.openCharacterCreate }));
    }

    toggleWeapon() {
        this.setState((state) => ({ openWeaponCreate: !state.openWeaponCreate }));
    }

    toggleSpaceship() {
        this.setState((state) => ({ openSpaceshipCreate: !state.openSpaceshipCreate }));
    }

    togglePlanet() {
        this.setState((state) => ({ openPlanetCreate: !state.openPlanetCreate }));
    }

    toggleMovie() {
        this.setState((state) => ({ openMovieCreate: !state.openMovieCreate }));
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
            <Fragment>
            <MDBNavbar className="Navbar" color="blue" dark expand="md">
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse className="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="/">Home</MDBNavLink>
                        </MDBNavItem>

                            {
                                this.state.userRole === userRoles.ADMIN ?
                                <Fragment>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Characters</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/characters">All</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleCharacter}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Weapons</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/weapons">All</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleWeapon}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Spaceships</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/spaceships">All</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleSpaceship}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Planets</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/planets">All</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.togglePlanet}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Movies</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/movies">All</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleMovie}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </Fragment>
                                : this.state.userRole === userRoles.USER ?
                                <Fragment>
                                <MDBNavItem>
                                    <MDBNavLink to="/characters">Characters</MDBNavLink>
                                </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/weapons">Weapons</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/spaceships">Spaceships</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/planets">Planets</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/movies">Movies</MDBNavLink>
                                    </MDBNavItem>
                                </Fragment>
                                :
                                <Fragment>
                                    <MDBNavItem>
                                        <MDBNavLink to="/characters">Characters</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/weapons">Weapons</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/spaceships">Spaceships</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/planets">Planets</MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink to="/movies">Movies</MDBNavLink>
                                    </MDBNavItem>
                                </Fragment>
                            }
                    </MDBNavbarNav>

                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <MDBIcon icon="jedi" />
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default" right>
                                    {
                                        this.state.userRole === userRoles.ADMIN 
                                        || this.state.userRole === userRoles.USER ?
                                        <Fragment>
                                            <MDBDropdownItem onClick={this.logout}>Logout</MDBDropdownItem>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <MDBDropdownItem onClick={this.toggleLogin}>Login</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleRegister}>Register</MDBDropdownItem>
                                        </Fragment>
                                    }
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
                {
                     this.state.userRole === userRoles.ADMIN ?
                     <AdminRoutes
                     notifHandler={this.props.notifHandler}
                     openCharacterCreate={this.state.openCharacterCreate}
                     openCharacterEdit={this.state.openCharacterEdit}
                     toggleCharacter={this.toggleCharacter}
                     openWeaponCreate={this.state.openWeaponCreate}
                     openWeaponEdit={this.state.openWeaponEdit}
                     toggleWeapon={this.toggleWeapon}
                     openSpaceshipCreate={this.state.openSpaceshipCreate}
                     openSpaceshipEdit={this.state.openSpaceshipEdit}
                     toggleSpaceship={this.toggleSpaceship}
                     openPlanetCreate={this.state.openPlanetCreate}
                     openPlanetEdit={this.state.openPlanetEdit}
                     togglePlanet={this.togglePlanet}
                     openMovieCreate={this.state.openMovieCreate}
                     openMovieEdit={this.state.openMovieEdit}
                     toggleMovie={this.toggleMovie} />
                     : this.state.userRole === userRoles.USER ?
                     <AuthUserRoutes notifHandler={this.props.notifHandler} />
                    :
                    <UnauthUserRoutes
                    notifHandler={this.props.notifHandler}
                    openLogin={this.state.openLogin}
                    toggleLogin={this.toggleLogin}
                    openRegister={this.state.openRegister}
                    toggleRegister={this.toggleRegister} />
                }
            </Fragment>
        );
    }
};

export default Navbar;
