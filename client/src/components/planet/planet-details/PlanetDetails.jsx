import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import planetService from './../../../services/planet-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class PlanetDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planet: null,
            isLoading: true
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        planetService.getPlanetById(this.props.match.params.planetId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({ planet: response.data.planet, isLoading: false });
                });
            } else {
                res.json().then(err => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/planets'); }, 2000);
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
                    <MDBCol md="6">{this.state.planet.name}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="6">
                        {
                            this.state.planet.images.map((img, index) => {
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
                    <MDBCol md="6"><span>{this.state.planet.info}</span></MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol  md="3">Terrain: {this.state.planet.terrain ? this.state.planet.terrain : 'Unknown'}</MDBCol>
                    <MDBCol md="3">Climate: {this.state.planet.climate ? this.state.planet.climate : 'Unknown'}</MDBCol>
                    <MDBCol></MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                    <MDBCol></MDBCol>
                    <MDBCol md="3">
                        Natives:
                        {
                            this.state.planet.natives.length > 0 ?
                            this.state.planet.natives.map((native, index) => {
                                return (
                                    <div key={index}><a href={`/character/${native._id}`}>{native.name}</a></div>
                                );
                            })
                            : ' Unknown'
                        }
                    </MDBCol>
                    <MDBCol md="3">
                        Affilations:
                        {
                            this.state.planet.affilations.length > 0 ?
                            this.state.planet.affilations.map((affilation, index) => {
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

export default PlanetDetails;
