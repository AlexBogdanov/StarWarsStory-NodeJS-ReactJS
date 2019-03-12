import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import planetService from './../../../services/planet-service';
import { OK } from './../../../constants/http-responses';

class PlanetsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            planets: null,
            doRender: false
        };

        this.fetchPlanets = this.fetchPlanets.bind(this);
    }

    componentDidMount() {
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

    render() {
        return (
            <div className="ListItems">
                {this.state.doRender ?
                this.state.planets.map((planet, index) => {
                    return (
                        <div key={index} className="item">
                            <span>{planet.name}</span>
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

export default PlanetsList;
