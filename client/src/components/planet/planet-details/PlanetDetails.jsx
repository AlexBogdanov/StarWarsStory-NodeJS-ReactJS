import React, { Component, Fragment } from 'react';
import './PlanetDetails.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import planetService from './../../../services/planet-service';
import { OK } from './../../../constants/http-responses';

class PlanetDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planet: null,
            isLoading: true
        };
    }

    componentWillMount() {
        planetService.getPlanetById(this.props.match.params.planetId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        this.setState({ planet: data.result, isLoading: false });
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
            <div className="PlanetDetails">
            {this.state.isLoading
            ? <Fragment>
                Loading...
            </Fragment>
            : <Fragment>
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
            </Fragment>}

            <NotificationContainer />

            </div>
        );
    };
};

export default PlanetDetails;
