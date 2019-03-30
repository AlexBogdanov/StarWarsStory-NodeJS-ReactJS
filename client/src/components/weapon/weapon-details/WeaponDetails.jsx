import React, { Component, Fragment } from 'react';
import './WeaponDetails.css';
import Loader from 'react-loader-spinner';

import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class WeaponDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weapon: null,
            isLoading: true
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        weaponService.getWeaponById(this.props.match.params.weaponId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({ weapon: response.data.weapon, isLoading: false });
                });
            } else {
                res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/weapons'); }, 2000);
                });
            }
          });
    }

    render() {
        return (
            <div className="WeaponDetails">
                {this.state.isLoading ?
                <Loader type="Ball-Triangle" color="#00BFFF" height="750" wifth="750" />
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
                    <br />
                    <label>Owners:</label> <br />
                    <ul>
                        {this.state.weapon.owners.map((owner, index) => {
                            return (
                                <li key={index}>
                                    <a href={`/character/${owner._id}`}>{owner.name}</a>
                                </li>
                            );
                        })}
                    </ul>
                </Fragment>}
            </div>
        );
    };
};

export default WeaponDetails;
