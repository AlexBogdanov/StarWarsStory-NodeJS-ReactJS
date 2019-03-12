import React, { Component, Fragment } from 'react';
import './WeaponDetails.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';

class WeaponDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weapon: null,
            isLoading: true
        };
    }

    componentWillMount() {
        weaponService.getWeaponById(this.props.match.params.weaponId)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        this.setState({ weapon: data.result, isLoading: false });
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
            <div className="WeaponDetails">
                {this.state.isLoading
                ? <Fragment>
                    Loading...
                </Fragment>
                : <Fragment>
                    {this.state.weapon.images.map((image, index) => {
                        return <img key={index} src={image} alt="" />
                    })}
                    <br />
                    <label>Name:</label>
                    <span> {this.state.weapon.name}</span>
                    <br />
                    <label>Info:</label>
                    <span> {this.state.weapon.info}</span>
                    <br />
                    <label>Affilations:</label> <br />
                    <ul>
                        {this.state.weapon.affilations.map((affilation, index) => {
                            return <li key={index}>{affilation}</li>
                        })}
                    </ul>
                </Fragment>}

                <NotificationContainer />
            </div>
        );
    };
};

export default WeaponDetails;
