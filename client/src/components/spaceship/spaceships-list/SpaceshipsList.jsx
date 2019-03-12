import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import spaceshipService from './../../../services/spaceship-service';
import { OK } from './../../../constants/http-responses';

class SpaceshipsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            spaceships: null,
            doRender: false
        };

        this.fetchSpaceships = this.fetchSpaceships.bind(this);
    }

    componentDidMount() {
        this.fetchSpaceships();
    }

    fetchSpaceships() {
        spaceshipService.getAllSpaceships()
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            this.setState({ spaceships: data.result, doRender: true });
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
                this.state.spaceships.map((spaceship, index) => {
                    return (
                        <div key={index} className="item">
                            <span>{spaceship.name}</span>
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

export default SpaceshipsList;
