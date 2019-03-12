import React, { Component } from 'react';
import './PlanetEdit.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import planetService from './../../../services/planet-service';
import { OK } from './../../../constants/http-responses';

class PlanetEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: '',
            affilations: '',
            climate: '',
            terrain: '',
            images: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        planetService.getPlanetById(this.props.match.params.planetId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        const planet = {
                            info: data.result.info,
                            affilations: data.result.affilations.join(', '),
                            climate: data.result.climate,
                            terrain: data.result.terrain,
                            images: data.result.images.join(', ')
                        };

                        this.setState(planet);
                    });
                } else {
                    res.json().then(err => {
                        NotificationManager.error(err.message);
                    });
                }
            });
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();

        const planet = {
            info: this.state.info,
            affilations: this.state.affilations.split(', '),
            climate: this.state.climate,
            terrain: this.state.terrain,
            images: this.state.images.split(', '),
        };
        const planetId = this.props.match.params.planetId;

        planetService.editPlanetById(planetId, planet)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        this.props.history.push(`/planet/details/${planetId}`);
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
            <div className="PlanetEdit">
                <form onSubmit={this.handleSubmit}>
                    <label>Info:</label>
                    <br />
                    <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
                    <br />
                    <label>Affilations:</label>
                    <br />
                    <textarea type="text" name="affilations" value={this.state.affilations} onChange={this.handleChange}></textarea>
                    <br />
                    <label>Climate:</label>
                    <br />
                    <input type="text" name="climate" value={this.state.climate} onChange={this.handleChange} />
                    <br />
                    <label>Terrain:</label>
                    <br />
                    <input type="text" name="terrain" value={this.state.terrain} onChange={this.handleChange} />
                    <br />
                    <label>Images:</label>
                    <br />
                    <textarea type="text" name="images" value={this.state.images} onChange={this.handleChange}></textarea>
                    <br />
                    <button type="submit">Edit</button>
                </form>

                <NotificationContainer />
            </div>
        );
    };
};

export default PlanetEdit;
