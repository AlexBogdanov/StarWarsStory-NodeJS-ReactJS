import React, { Component } from 'react';
import './WeaponCreate.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';

class WeaponCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            affilations: '',
            info: '',
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

        const weapon = {
            name: this.state.name,
            affilations: this.state.affilations.split(', '),
            info: this.state.info,
            images: this.state.images.split(', ')
        };

        weaponService.createWeapon(weapon)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        this.props.history.push(`/weapon/details/${data.result}`);
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
            <div className="WeaponCreate">
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

export default WeaponCreate;
