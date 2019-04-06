import React, { Component, Fragment } from 'react';
import './MovieDetails.css';
import Loader from 'react-loader-spinner';

import movieService from './../../../services/movie-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes, movieTypesName } from './../../../constants/common';
import { errorNotifs } from './../../../constants/notification-messages';

class MovieDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: null,
            isLoading: false
        };

        this.getDate = this.getDate.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        movieService.getMovieById(this.props.match.params.movieId)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.setState({ movie: response.data.movie, isLoading: false });
                });
            } else {
                res.json().then(() => {
                    this.props.notifHandler(errorNotifs.SOMETHING_WENT_WRONG, notifTypes.error);
                    setTimeout(() => { this.props.history.push('/movies'); }, 2000);
                });
            }
          });
    }

    getDate(date) {
        const parsedDate = new Date(date);
        return `${parsedDate.getDate()}-${parsedDate.getMonth() + 1}-${parsedDate.getFullYear()}`;
    }

    render() {
        return (
            <div className="MovieDetails">
                {this.state.isLoading ?
                <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
                : <Fragment>
                    <img src={this.state.movie.cover} alt=""></img>
                    <br />
                    <label>Name:</label>
                    <span> {this.state.movie.name}</span>
                    <br />
                    <label>Type: </label>
                    <span>{movieTypesName[this.state.movie.type]}</span>
                    <br />
                    <label>Info:</label>
                    <span> {this.state.movie.info}</span>
                    <br />
                    <label>Release date: </label>
                    <span>{this.getDate(this.state.movie.releaseDate)}</span>
                    <br />
                    <label>Director: </label>
                    <span>{this.state.movie.director}</span>
                    <br />
                    <label>Writers:</label> <br />
                    <ul>
                        {this.state.movie.writers.map((writer, index) => {
                            return <li key={index}>{writer}</li>
                        })}
                    </ul>
                    <br />
                    <label>Actors:</label> <br />
                    <ul>
                        {this.state.movie.actors.map((actor, index) => {
                            return <li key={index}>{actor}</li>
                        })}
                    </ul>
                    <br />
                </Fragment>}
            </div>
        );
    };
};

export default MovieDetails;
