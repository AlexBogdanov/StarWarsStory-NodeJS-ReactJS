import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import movieService from './../../../services/movie-service';
import { OK } from './../../../constants/http-responses';

class MoviesList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            movies: null,
            doRender: false
        };

        this.fetchMovies = this.fetchMovies.bind(this);
    }

    componentDidMount() {
        this.fetchMovies();
    }

    fetchMovies() {
        movieService.getAllMovies()
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            this.setState({ movies: data.result, doRender: true });
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
                this.state.movies.map((movie, index) => {
                    return (
                        <div key={index} className="item">
                            <span>{movie.name}</span>
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

export default MoviesList;
