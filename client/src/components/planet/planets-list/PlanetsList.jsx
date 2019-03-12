import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import ListItem from './../../list-item/ListItem';
import planetService from './../../../services/planet-service';
import { OK } from './../../../constants/http-responses';

class PlanetsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            userRole: '',
            planets: null,
            doRender: false
        };

        this.fetchPlanets = this.fetchPlanets.bind(this);
        this.openPlanetDetails = this.openPlanetDetails.bind(this);
        this.openPlanetEdit = this.openPlanetEdit.bind(this);
        this.deletePlanet = this.deletePlanet.bind(this);
    }

    componentDidMount() {
        const userRole = localStorage.getItem('role');

        if (userRole) {
            this.setState({ userRole });
        }

        this.fetchPlanets();
    }

    fetchPlanets() {
        planetService.getAllPlanets()
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            this.setState({ planets: data.result, doRender: true });
                        });
                } else {
                    res.json()
                        .then(err => {
                            NotificationManager.error(err.message);
                        })
                }
            })
    }

    openPlanetDetails(id) {
        this.props.history.push(`/planet/details/${id}`);
    }

    openPlanetEdit(id) {
        this.props.history.push(`/planet/edit/${id}`);
    }

    deletePlanet(id) {
        planetService.deletePlanet(id)
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

                <NotificationContainer />
            </div>
        );
    };
};

export default PlanetsList;
