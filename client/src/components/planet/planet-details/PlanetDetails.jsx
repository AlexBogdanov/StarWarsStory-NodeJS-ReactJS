import React, { Component, Fragment } from 'react';
import './PlanetDetails.css';
import Loader from 'react-loader-spinner';

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
            <div className="PlanetDetails">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
                    :
                    <Fragment>
                        {this.state.planet.images.map((image, index) => {
                            return <img key={index} src={image} alt="" />
                        })}
                        <br />
                        <label>Name:</label>
                        <span> {this.state.planet.name}</span>
                        <br />
                        <label>Info:</label>
                        <span> {this.state.planet.info}</span>
                        <br />
                        <label>Affilations:</label> <br />
                        <ul>
                            {this.state.planet.affilations.map((affilation, index) => {
                                return <li key={index}>{affilation}</li>
                            })}
                        </ul>
                        <label>Climate:</label>
                        <span> {this.state.planet.climate}</span>
                        <br />
                        <label>Terrain:</label>
                        <span> {this.state.planet.terrain}</span>
                        <br />
                        <label>Natives:</label> <br />
                        <ul>
                            {this.state.planet.natives.map((native, index) => {
                                return (
                                    <li key={index}>
                                        <a href={`/character/${native._id}`}>{native.name}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Fragment>
                }
            </div>
        );
    };
};

export default PlanetDetails;
