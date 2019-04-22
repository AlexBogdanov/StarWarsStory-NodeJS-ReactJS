import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes, userRoles } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class WeaponDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRole: '',
            weapon: null,
            isLoading: false
        };

        this.openEdit = this.openEdit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true, userRole:
            window.localStorage.getItem('userRole') ? window.localStorage.getItem('userRole')
            : window.sessionStorage.getItem('userRole') });
        
        weaponService.getWeaponById(this.props.match.params.weaponId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({ weapon: response.data.weapon, isLoading: false });
                });
            } else {
                res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/weapons'); }, 2000);
                });
            }
          });
    }

    openEdit() {
        this.props.history.push(`/weapon/edit/${this.state.weapon._id}`);
    }

    delete() {
        this.setState({ isLoading: true });

        weaponService.deleteWeapon(this.state.weapon._id)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push('/weapons') }, 2000);
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
                    <MDBCol md="6">{this.state.weapon.name}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        {
                            this.state.weapon.images.map((img, index) => {
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
                    <MDBCol md="6"><span>{this.state.weapon.info}</span></MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Owners:
                        {
                            this.state.weapon.owners.length > 0 ?
                            this.state.weapon.owners.map((owner, index) => {
                                return (
                                    <div key={index}><a href={`/character/${owner._id}`}>{owner.name}</a></div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol md="3">
                        Affilations:
                        {
                            this.state.weapon.affilations.length > 0 ?
                            this.state.weapon.affilations.map((affilation, index) => {
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

export default WeaponDetails;
