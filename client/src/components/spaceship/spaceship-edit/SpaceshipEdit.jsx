import React, { Component } from 'react';
import './SpaceshipEdit.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import spaceshipService from './../../../services/spaceship-service';
import { OK } from './../../../constants/http-responses';

class SpaceshipEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dimension: '',
            affilations: '',
            info: '',
            images: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        spaceshipService.getSpacehipById(this.props.match.params.spaceshipId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        const spaceship = {
                            dimension: data.result.dimension,
                            affilations: data.result.affilations.join(', '),
                            info: data.result.info,
                            images: data.result.images.join(', ')
                        };

                        this.setState(spaceship);
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

        const spaceship = {
            dimension: this.state.dimension,
            affilations: this.state.affilations.split(', '),
            info: this.state.info,
            images: this.state.images.split(', ')
        };
        const spaceshipId = this.props.match.params.spaceshipId;

        spaceshipService.editSpaceshipById(spaceshipId, spaceship)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        this.props.history.push(`/spaceship/details/${spaceshipId}`);
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
            <div className="SpaceshipEdit">
                <form onSubmit={this.handleSubmit}>
                    <label>Dimension:</label>
                    <br />
                    <input type="text" name="dimension" value={this.state.dimension} onChange={this.handleChange} />
                    <br />
                    <label>Info:</label>
                    <br />
                    <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
                    <br />
                    <label>Affilations:</label>
                    <br />
                    <textarea type="text" name="affilations" value={this.state.affilations} onChange={this.handleChange}></textarea>
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

export default SpaceshipEdit;
