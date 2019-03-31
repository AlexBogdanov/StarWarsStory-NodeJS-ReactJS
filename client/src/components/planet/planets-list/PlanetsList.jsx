import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';

import ListItem from './../../list-item/ListItem';
import planetService from './../../../services/planet-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';

class PlanetsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            planets: [],
            isLoading: false,
            doRender: false,
            userRole: ''
        };

        this.openPlanetDetails = this.openPlanetDetails.bind(this);
        this.openPlanetEdit = this.openPlanetEdit.bind(this);
        this.deletePlanet = this.deletePlanet.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        if (localStorage.getItem('userRole')) {
            this.setState({ userRole: localStorage.getItem('userRole') });
        } else if (sessionStorage.getItem('userRole')) {
            this.setState({ userRole: sessionStorage.getItem('userRole') });
        }

        planetService.getAllPlanets()
          .then(res => {
              if (res.status === OK) {
                  res.json().then(response => {
                    if (response.data.planets.length > 0) {
                        this.setState({ planets: response.data.planets, doRender: true, isLoading: false });
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

    openPlanetDetails(id) {
        this.props.history.push(`/planet/${id}`);
    }

    openPlanetEdit(id) {
        this.props.history.push(`/planet/edit/${id}`);
    }

    deletePlanet(id) {
        this.setState({ isLoading: true });

        planetService.deletePlanet(id)
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
                })
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
                        {
                            this.state.doRender ?
                            this.state.planets.map((planet, index) => {
                                return (
                                    <ListItem
                                    key={index}
                                    itemId={planet._id}
                                    name={planet.name}
                                    shortDescr={planet.info}
                                    imageUrl={planet.images[0]}
                                    userRole={this.state.userRole}
                                    openItemDetails={this.openPlanetDetails}
                                    openItemEdit={this.openPlanetEdit}
                                    deleteItem={this.deletePlanet} />
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

export default PlanetsList;
