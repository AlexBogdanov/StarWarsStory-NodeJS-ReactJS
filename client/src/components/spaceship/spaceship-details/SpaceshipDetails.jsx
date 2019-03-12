import React, { Component, Fragment } from 'react';
import './SpaceshipDetails.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import spaceshipService from './../../../services/spaceship-service';
import { OK } from './../../../constants/http-responses';

class SpaceshipDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            spaceship: null,
            isLoading: true
        };
    }

    componentWillMount() {
        spaceshipService.getSpacehipById(this.props.match.params.spaceshipId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        this.setState({ spaceship: data.result, isLoading: false });
                    });
                } else {
                    res.json().then(err => {
                        NotificationManager.error(err.message);
                    });
                }
            });
    }

    render() {
        return (
            <div className="SpaceshipDetails">
                {this.state.isLoading
                ? <Fragment>
                    Loading...
                </Fragment>
                : <Fragment>
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
                </Fragment>}

                <NotificationContainer />
            </div>
        );
    };
};

export default SpaceshipDetails;
