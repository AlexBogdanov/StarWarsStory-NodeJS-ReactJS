import React, { Component, Fragment } from 'react';
import {
    MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon,
    MDBFormInline
} from 'mdbreact';

import userService from './../../services/user-service';
import AuthRoutes from '../../routes/authUser-routes';
import UnauthUserRoutes from './../../routes/unauthUser-routes';
import { userRoles, notifTypes } from './../../constants/common';
import { errorNotifs } from './../../constants/notification-messages';
import { OK } from './../../constants/http-responses';

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
            openMovieCreate: false,
            characters: [],
            weapons: [],
            spaceships: [],
            planets: [],
            movies: [],
            searchStr: '',
            matchedResults: []
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
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.openItem = this.openItem.bind(this);
    }

    componentWillMount() {
        this.setState({ userRole: localStorage.getItem('userRole')
        ? localStorage.getItem('userRole') : sessionStorage.getItem('userRole')});
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

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    search(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.state.searchStr) {
                userService.search(this.state.searchStr)
                  .then(res => {
                      if (res.status === OK) {
                          res.json().then(response => {
                            this.setState({ matchedResults: response.data });
                            console.log(this.state.matchedResults);
                          });
                      } else {
                          res.json().then(() => {
                            this.props.notifHandler(errorNotifs.NO_RESULTS, notifTypes.info);
                          });
                      }
                  });
            }
        }
    }

    openItem(item) {
        if (item.hasOwnProperty('vehicles')) {
            window.location.href = `/character/${item._id}`;
        } else if (item.hasOwnProperty('owners')) {
            window.location.href = `/weapon/${item._id}`;
        } else if (item.hasOwnProperty('pilots')) {
            window.location.href = `/spaceship/${item._id}`;
        } else if (item.hasOwnProperty('natives')) {
            window.location.href = `/planet/${item._id}`;
        } else if (item.hasOwnProperty('releaseDate')) {
            window.location.href = `/movie/${item._id}`;
        }
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
                                this.state.userRole === userRoles.ADMIN || this.state.userRole === userRoles.USER ?
                                <Fragment>
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Characters</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/characters">All</MDBDropdownItem>
                                            <MDBDropdownItem href="/my-characters">My characters</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleCharacter}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Weapons</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/weapons">All</MDBDropdownItem>
                                            <MDBDropdownItem href="/my-weapons">My weapons</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleWeapon}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Spaceships</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/spaceships">All</MDBDropdownItem>
                                            <MDBDropdownItem href="/my-spaceships">My spaceships</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleSpaceship}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Planets</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/planets">All</MDBDropdownItem>
                                            <MDBDropdownItem href="/my-planets">My planets</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.togglePlanet}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>

                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Movies</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem href="/movies">All</MDBDropdownItem>
                                            <MDBDropdownItem href="/my-movies">My movies</MDBDropdownItem>
                                            <MDBDropdownItem onClick={this.toggleMovie}>Create</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
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
                        {
                            this.state.matchedResults.length > 0 ?
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon fab icon="galactic-republic" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        {
                                            this.state.matchedResults.map((item, index) => {
                                                return(
                                                    <MDBDropdownItem key={index} onClick={() => this.openItem(item)}>{item.name}</MDBDropdownItem>
                                                );
                                            })
                                        }
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                            : null
                        }
                        <MDBNavItem>
                            <MDBFormInline waves>
                                <div className="md-form my-0">
                                    <input className="form-control mr-sm-2" type="text" name="searchStr" placeholder="Search" arial-label="Search" onChange={this.handleChange} onKeyPress={this.search} />
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
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
                     this.state.userRole === userRoles.ADMIN || this.state.userRole === userRoles.USER ?
                     <AuthRoutes
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
