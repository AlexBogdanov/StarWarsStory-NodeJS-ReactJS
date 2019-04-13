import React, { Component, Fragment } from 'react';
import './SpaceshipDetails.css';
import Loader from 'react-loader-spinner';

import spaceshipService from './../../../services/spaceship-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class SpaceshipDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spaceship: null,
            isLoading: false
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });

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

    render() {
        return (
            <div className="SpaceshipDetails">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="750" />
                    :
                    <Fragment>
                        {this.state.spaceship.images.map((image, index) => {
                            return <img key={index} src={image} alt="" />
                        })}
                        <br />
                        <label>Name:</label>
                        <span> {this.state.spaceship.name}</span>
                        <br />
                        <label>Dimension:</label>
                        <span> {this.state.spaceship.dimension}</span>
                        <br />
                        <label>Info:</label>
                        <span> {this.state.spaceship.info}</span>
                        <br />
                        <label>Affilations:</label> <br />
                        <ul>
                            {this.state.spaceship.affilations.map((affilation, index) => {
                                return <li key={index}>{affilation}</li>
                            })}
                        </ul>
                        <br />
                        <label>Pilots:</label> <br />
                        <ul>
                            {this.state.spaceship.pilots.map((pilot, index) => {
                                return (
                                    <li key={index}>
                                        <a href={`/character/${pilot._id}`}>{pilot.name}</a>
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

export default SpaceshipDetails;
