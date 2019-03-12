import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';

class WeaponsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            weapons: null,
            doRender: false
        };

        this.fetchWeapons = this.fetchWeapons.bind(this);
    }

    componentDidMount() {
        this.fetchWeapons();
    }

    fetchWeapons() {
        weaponService.getAllWeapons()
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            this.setState({ weapons: data.result, doRender: true });
                        });
                } else {
                    res.json()
                        .then(err => {
                            NotificationManager.error(err.message);
                        })
                }
            })
    }

    render() {
        return (
            <div className="ListItems">
                {this.state.doRender ?
                this.state.weapons.map((weapon, index) => {
                    return (
                        <div key={index} className="item">
                            <span>{weapon.name}</span>
                        </div>
                    );
                })
                :
                <div> No results </div>
                }

                <NotificationContainer />
            </div>
        );
    };
};

export default WeaponsList;
