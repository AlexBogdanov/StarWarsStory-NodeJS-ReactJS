import React, { Component, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { MDBRow } from 'mdbreact';

import ListItem from './../../list-item/ListItem';
import movieService from './../../../services/movie-service';
import { OK } from './../../../constants/http-responses';
import { notifTypes } from '../../../constants/common';

class MovieList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            movies: [],
            isLoading: false,
            doRender: false,
            userRole: ''
        };

        this.openMovieDetails = this.openMovieDetails.bind(this);
        this.openMovieEdit = this.openMovieEdit.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    componentWillMount() {
        this.setState({ isLoading: true });

        if (localStorage.getItem('userRole')) {
            this.setState({ userRole: localStorage.getItem('userRole') });
        } else if (sessionStorage.getItem('userRole')) {
            this.setState({ userRole: sessionStorage.getItem('userRole') });
        }
        
        movieService.getAllMovies()
          .then(res => {
              if (res.status === OK) {

                  res.json().then(response => {
                    if (response.data.movies.length > 0) {
                        this.setState({ movies: response.data.movies, doRender: true, isLoading: false });
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

    openMovieDetails(id) {
        this.props.history.push(`/movie/${id}`);
    }

    openMovieEdit(id) {
        this.props.history.push(`/movie/edit/${id}`);
    }

    deleteMovie(id) {
        this.setState({ isLoading: true });
        
        movieService.deleteMovie(id)
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
                    <Loader type="Ball-Triangle" color="black" height="750" />
                    :
                    <Fragment>
                        {this.state.doRender ?
                        <MDBRow>
                        {this.state.movies.map((movie, index) => {
                            return (
                                <ListItem
                                key={index}
                                itemId={movie._id}
                                name={movie.name}
                                shortDescr={movie.info}
                                imageUrl={movie.cover}
                                userRole={this.state.userRole}
                                openItemDetails={this.openMovieDetails}
                                openItemEdit={this.openMovieEdit}
                                deleteItem={this.deleteMovie} />
                            );
                        })}
                        </MDBRow>
                        :
                        <div> No results </div>
                        }
                    </Fragment>
                }
            </div>
        );
    };
};

export default MovieList;
