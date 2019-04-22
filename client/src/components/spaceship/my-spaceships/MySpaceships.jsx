import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBRow } from 'mdbreact';

import ListItem from './../../list-item/ListItem';
import spaceshipService from './../../../services/spaceship-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';

class MySpaceships extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            spaceships: [],
            isLoading: false,
            doRender: false,
            userRole: ''
        };

        this.openSpaceshipDetails = this.openSpaceshipDetails.bind(this);
        this.openSpaceshipEdit = this.openSpaceshipEdit.bind(this);
        this.deleteSpaceship = this.deleteSpaceship.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        if (localStorage.getItem('userRole')) {
            this.setState({ userRole: localStorage.getItem('userRole') });
        } else if (sessionStorage.getItem('userRole')) {
            this.setState({ userRole: sessionStorage.getItem('userRole') });
        }
        
        spaceshipService.getUserSpaceships()
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    if (response.data.length > 0) {
                        this.setState({ spaceships: response.data.map(spaceship => {
                            spaceship.isOwned = true;
                            return spaceship;
                        }), doRender: true, isLoading: false });
                        return;
                    }

                    this.setState({ isLoading: false });
                });
            } else {
                res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                    this.props.history.push('/');
                });
            }
          });
    }

    openSpaceshipDetails(id) {
        this.props.history.push(`/spaceship/${id}`);
    }

    openSpaceshipEdit(id) {
        this.props.history.push(`/spaceship/edit/${id}`);
    }

    deleteSpaceship(id) {
        this.setState({ isLoading: true });

        spaceshipService.deleteSpaceship(id)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { window.location.reload(); }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                });
            }
          });
    }

    render() {
        return (
            <div className="ListItems">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="120" />
                    :
                    <Fragment>
                        {
                            this.state.doRender ?
                            <MDBRow className="padding">
                            {this.state.spaceships.map((spaceship, index) => {
                                return (
                                    <ListItem
                                    key={index}
                                    itemId={spaceship._id}
                                    name={spaceship.name}
                                    shortDescr={spaceship.info}
                                    imageUrl={spaceship.images[0]}
                                    userRole={this.state.userRole}
                                    openItemDetails={this.openSpaceshipDetails}
                                    openItemEdit={this.openSpaceshipEdit}
                                    deleteItem={this.deleteSpaceship}
                                    isOwned={spaceship.isOwned} />
                                );
                            })}
                            </MDBRow>
                            :
                            <div> No results </div>
                        }
                    </Fragment>
                }
            </div>
        );
    };
};

export default MySpaceships;
