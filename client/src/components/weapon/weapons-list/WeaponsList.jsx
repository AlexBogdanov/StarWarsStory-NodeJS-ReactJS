import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';

import ListItem from './../../list-item/ListItem';
import weaponService from './../../../services/weapon-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';

class WeaponsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            weapons: [],
            isLoading: false,
            doRender: false,
            userRole: ''
        };

        this.openWeaponDetails = this.openWeaponDetails.bind(this);
        this.openWeaponEdit = this.openWeaponEdit.bind(this);
        this.deleteWeapon = this.deleteWeapon.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        if (localStorage.getItem('userRole')) {
            this.setState({ userRole: localStorage.getItem('userRole') });
        } else if (sessionStorage.getItem('userRole')) {
            this.setState({ userRole: sessionStorage.getItem('userRole') });
        }

        weaponService.getAllWeapons()
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    if (response.data.weapons.length > 0) {
                        this.setState({ weapons: response.data.weapons, doRender: true, isLoading: false });
                        return;
                    }

                    this.setState({ isLoading: false });
                });
            } else {
                res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                    this.props.history.push('/');
                });
            }
          });
    }

    openWeaponDetails(id) {
        this.props.history.push(`/weapon/${id}`);
    }

    openWeaponEdit(id) {
        this.props.history.push(`/weapon/edit/${id}`);
    }

    deleteWeapon(id) {
        this.setState({ isLoading: true });

        weaponService.deleteWeapon(id)
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                      this.props.notifHandler(response.data.msg, notifTypes.success);
                      setTimeout(() => { window.location.reload(); }, 2000);
                  });
              } else {
                  res.json().then(err => {
                    this.setState({ isLoading: false });
                    this.props.notifHandler(err.message, notifTypes.error);
                  });
              }
          });
    }

    render() {
        return (
            <div className="ListItems">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
                    :
                    <Fragment>
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
                                deleteItem={this.deleteWeapon}
                                userRole={this.state.userRole} />
                            );
                        })
                        :
                        <div> No results </div>
                        }
                    </Fragment>
                }
            </div>
        );
    };
};

export default WeaponsList;
