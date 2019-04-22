import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import spaceshipService from './../../../services/spaceship-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes, userRoles } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class SpaceshipDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: '',
            spaceship: null,
            isLoading: false
        };

        this.openEdit = this.openEdit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true, userRole:
            window.localStorage.getItem('userRole') ? window.localStorage.getItem('userRole')
            : window.sessionStorage.getItem('userRole') });

        spaceshipService.getSpacehipById(this.props.match.params.spaceshipId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({ spaceship: response.data.spaceship, isLoading: false });
                });
            } else {
                res.json().then(err => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/spaceships'); }, 2000);
                });
            }
          });
    }

    openEdit() {
        this.props.history.push(`/spaceship/edit/${this.state.spaceship._id}`);
    }

    delete() {
        this.setState({ isLoading: true });

        spaceshipService.deleteSpaceship(this.state.spaceship._id)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push('/spaceships') }, 2000);
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
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBContainer style={{ 'backgroundColor': "white", opacity: "0.9 " }}>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">{this.state.spaceship.name}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        {
                            this.state.spaceship.images.map((img, index) => {
                                return (
                                    <Fragment key={index}>
                                        <img src={img} alt="" className="img-fluid" />
                                        <hr />
                                    </Fragment>
                                );
                            })
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6"><span>{this.state.spaceship.info}</span></MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Pilots:
                        {
                            this.state.spaceship.pilots.length > 0 ?
                            this.state.spaceship.pilots.map((pilot, index) => {
                                return (
                                    <div key={index}><a href={`/character/${pilot._id}`}>{pilot.name}</a></div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol md="3">
                        Affilations:
                        {
                            this.state.spaceship.affilations.length > 0 ?
                            this.state.spaceship.affilations.map((affilation, index) => {
                                return (
                                    <div key={index}>{affilation}</div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                {
                    this.state.userRole === userRoles.ADMIN ?
                    <MDBRow>
                        <MDBCol></MDBCol>
                        <MDBCol>
                            <MDBBtn type="button" onClick={this.openEdit}>Edit</MDBBtn>
                            <MDBBtn type="button" onClick={this.delete}>Delete</MDBBtn>
                        </MDBCol>
                        <MDBCol></MDBCol>
                    </MDBRow>
                    : null
                }
            </MDBContainer>
        );
    };
};

export default SpaceshipDetails;
