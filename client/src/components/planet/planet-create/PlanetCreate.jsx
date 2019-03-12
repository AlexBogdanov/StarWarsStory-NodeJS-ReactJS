import React, { Component } from 'react';
import './PlanetCreate.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import planetService from './../../../services/planet-service';
import { OK } from './../../../constants/http-responses';

class PlanetCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            info: '',
            affilations: '',
            climate: '',
            terrain: '',
            images: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();

        const planet = {
            name: this.state.name,
            info: this.state.info,
            affilations: this.state.affilations.split(', '),
            climate: this.state.climate,
            terrain: this.state.terrain,
            images: this.state.images.split(', ')
        };

        planetService.createPlanet(planet)
            .then(res => {
                if (res.status === OK)  {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        this.props.history.push(`/planet/details/${data.result}`);
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
            <div className="PlanetCreate">
            <form onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <br />
                <input type="text" name="name" onChange={this.handleChange} />
                <br />
                <label>Info:</label>
                <br />
                <textarea type="text" name="info" onChange={this.handleChange}></textarea>
                <br />
                <label>Affilations:</label>
                <br />
                <textarea type="text" name="affilations" onChange={this.handleChange}></textarea>
                <br />
                <label>Climate:</label>
                <br />
                <input type="text" name="climate" onChange={this.handleChange} />
                <br />
                <label>Terrain:</label>
                <br />
                <input type="text" name="terrain" onChange={this.handleChange} />
                <br />
                <label>Images:</label>
                <br />
                <textarea type="text" name="images" onChange={this.handleChange}></textarea>
                <br />
                <button type="submit">Create</button>
            </form>

            <NotificationContainer />

            </div>
        );
    };
};

export default PlanetCreate;
