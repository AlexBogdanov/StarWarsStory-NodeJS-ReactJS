import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class WeaponDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weapon: null,
            isLoading: false
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        
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

    render() {
        return (
            this.state.isLoading ?
            <Loader type="Ball-Triangle" color="black" height="120" />
            :
            <MDBContainer style={{ 'background-color': "white", opacity: "0.9 " }}>
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
                                    <Fragment>
                                        <img src={img} alt="" className="img-fluid" key={index} />
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
            </MDBContainer>
        );
    };
};

export default WeaponDetails;
