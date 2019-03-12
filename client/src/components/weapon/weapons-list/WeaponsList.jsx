import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import ListItem from './../../list-item/ListItem';
import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';

class WeaponsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userRole: '',
            weapons: null,
            doRender: false
        };

        this.fetchWeapons = this.fetchWeapons.bind(this);
        this.openWeaponDetails = this.openWeaponDetails.bind(this);
        this.openWeaponEdit = this.openWeaponEdit.bind(this);
        this.deleteWeapon = this.deleteWeapon.bind(this);
    }

    componentDidMount() {
        const userRole = localStorage.getItem('role');

        if (userRole) {
            this.setState({ userRole });
        }

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

    openWeaponDetails(id) {
        this.props.history.push(`/weapon/details/${id}`);
    }

    openWeaponEdit(id) {
        this.props.history.push(`/weapon/edit/${id}`);
    }

    deleteWeapon(id) {
        weaponService.deleteWeapon(id)
            .then(res => {
                if (res.status === OK) {
                    res.json().then(data => {
                        NotificationManager.success(data.message);
                        window.location.reload();
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
            <div className="ListItems">
                {this.state.doRender ?
                this.state.weapons.map((weapon, index) => {
                    return (
                        <ListItem
                        key={index}
                        itemId={weapon._id}
                        name={weapon.name}
                        shortDescr={weapon.info}
                        imageUrl={weapon.images[0]}
                        userRole={this.state.userRole}
                        openItemDetails={this.openWeaponDetails}
                        openItemEdit={this.openWeaponEdit}
                        deleteItem={this.deleteWeapon} />
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
