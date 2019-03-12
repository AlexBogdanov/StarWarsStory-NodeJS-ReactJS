import React, { Component } from 'react';
import './WeaponEdit.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';

class WeaponEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            info: '',
            affilations: '',
            images: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        weaponService.getWeaponById(this.props.match.params.weaponId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        const weapon = {
                            info: data.result.info,
                            affilations: data.result.affilations.join(', '),
                            images: data.result.images.join(', ')
                        };

                        this.setState(weapon);
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

        const weapon = {
            info: this.state.info,
            affilations: this.state.affilations.split(', '),
            images: this.state.images.split(', ')
        };
        const weaponId = this.props.match.params.weaponId

        weaponService.editWeaponById(weaponId, weapon)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        this.props.history.push(`/weapon/details/${weaponId}`);
                    });
                } else {
                    res.json().then(err => {
                        Notification.error(err.message);
                    });
                }
            });
    }

    render() {
        return (
            <div className="WeaponEdit">
                <form onSubmit={this.handleSubmit}>
                    <label>Info:</label>
                    <br />
                    <textarea type="text" name="info" value={this.state.info} onChange={this.handleChange}></textarea>
                    <br />
                    <label>Affilation:</label>
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

export default WeaponEdit;
