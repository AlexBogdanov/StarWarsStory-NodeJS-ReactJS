import React, { Component, Fragment } from 'react';
import './MovieCreate.css';
import Loader from 'react-loader-spinner';

import movieService from './../../../services/movie-service';
import collectionManager from './../../../utilities/collection-manager';
import { OK } from './../../../constants/http-responses';
import { errorNotifs } from './../../../constants/notification-messages';
import { movieTypes, movieTypesName, notifTypes } from './../../../constants/common';

const collectionNames = {
    writers: 0,
    actors: 1
};

class MovieCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            type: '',
            date: 0,
            month: 0,
            year: 0,
            info: '',
            director: '',
            writers: [],
            actors: [],
            cover: '',
            currWriter: '',
            currActor: '',
            isLoading: false
        };

        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.selectOption = this.selectOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addItem(collectionName) {
        if (collectionName === collectionNames.writers) {
            const doAdd = collectionManager.doAddItem(this.state.currWriter, this.state.writers);

            if (doAdd) {
                const writers = collectionManager.addItem(this.state.currWriter, this.state.writers);
                this.setState({ writers, currWriter: '' });
            }
        } else if (collectionName === collectionNames.actors) {
            const doAdd = collectionManager.doAddItem(this.state.currActor, this.state.actors);

            if (doAdd) {
                const actors = collectionManager.addItem(this.state.currActor, this.state.actors);
                this.setState({ actors, currActor: '' });
            }
        }
    }

    removeItem(collectionName, item) {
        if (collectionName === collectionNames.writers) {
            const index = collectionManager.getIndexOfItem(item, this.state.writers);

            if (index !== -1) {
                const writers = collectionManager.removeItem(index, this.state.writers);
                this.setState({ writers });
            }
        } else if (collectionName === collectionNames.actors) {
            const index = collectionManager.getIndexOfItem(item, this.state.actors);

            if (index !== -1) {
                const actors = collectionManager.removeItem(index, this.state.actors);
                this.setState({ actors });
            }
        }
    }

    selectOption(e) {
        this.setState({ type: e.target.value });
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        this.setState({ isLoading: true });

        if (this.state.name.length < 5) {
            this.props.notifHandler(errorNotifs.MOVIE_NAME_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.type) {
            this.props.notifHandler(errorNotifs.MOVIE_TYPE_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.date || !this.state.month || !this.state.year) {
            this.props.notifHandler(errorNotifs.MOVIE_RELEASE_DATE_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.date > 31 || this.state.month > 12 || this.state.year.toString().length > 4) {
            this.props.notifHandler(errorNotifs.INVALID_DATE, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (this.state.info.length < 30) {
            this.props.notifHandler(errorNotifs.MOVIE_INFO_TOO_SHORT, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        if (!this.state.cover) {
            this.props.notifHandler(errorNotifs.MOVIE_COVER_REQUIRED, notifTypes.error);
            this.setState({ isLoading: false });
            return;
        }

        const releaseDate = new Date(`${this.state.year.toString()}-${this.state.month.toString()}-${this.state.date.toString()}`);

        const movie = {
            name: this.state.name,
            type: this.state.type,
            releaseDate,
            info: this.state.info,
            director: this.state.director,
            writers: this.state.writers,
            actors: this.state.actors,
            cover: this.state.cover
        };

        movieService.createMovie(movie)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { this.props.history.push(`/movie/${response.data.movieId}`) }, 2000);
                });
            } else {
                res.json().then(err => {
                    this.props.notifHandler(err.message, notifTypes.error);
                    this.setState({ isLoading: false });
                });
            }
          });
    }

    render() {
        return (
            <div className="MovieCreate">
                {
                    this.state.isLoading ?
                    <Loader type="Ball-Triangle" color="black" height="750" />
                    :
                    <form onSubmit={this.handleSubmit}>
                        <label>Name:</label>
                        <br />
                        <input type="text" name="name" onChange={this.handleChange} />
                        <br />
                        <select value={this.state.type} onChange={this.selectOption}>
                            <option hidden>Choose type</option>
                            {Object.keys(movieTypes).map((movieType, index) => {
                                return (
                                    <option key={index} value={movieTypes[movieType]}>{movieTypesName[movieTypes[movieType]]}</option>
                                );
                            })}
                        </select>
                        <br />
                        <label>Release date:</label>
                        <br />
                        <input type="number" maxLength="2" name="date" placeholder="dd" onChange={this.handleChange} />
                        <input type="number" maxLength="2" name="month" placeholder="mm" onChange={this.handleChange} />
                        <input type="number" maxLength="4" name="year" placeholder="yyyy" onChange={this.handleChange} />
                        <br />
                        <label>Info:</label>
                        <br />
                        <textarea type="text" name="info" onChange={this.handleChange}></textarea>
                        <br />
                        <label>Director:</label>
                        <br />
                        <input type="text" name="director" onChange={this.handleChange} />
                        <br />

                        <label>Add a writer:</label>
                        <br />
                        <input type="text" name="currWriter" value={this.state.currWriter} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.writers)}>Add</button>
                        <br />
                        {this.state.writers.length > 0 ?
                        <Fragment>
                            <label>Writers:</label>
                            <br />
                            <ul>
                                {this.state.writers.map((writer, index) => {
                                    return (
                                        <li key={index}>{writer} <button type="button" onClick={() => this.removeItem(collectionNames.writers, writer)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />

                        <label>Add an actor:</label>
                        <br />
                        <input type="text" name="currActor" value={this.state.currActor} onChange={this.handleChange} />
                        <button type="button" onClick={() => this.addItem(collectionNames.actors)}>Add</button>
                        <br />
                        {this.state.actors.length > 0 ?
                        <Fragment>
                            <label>Actors:</label>
                            <br />
                            <ul>
                                {this.state.actors.map((actor, index) => {
                                    return (
                                        <li key={index}>{actor} <button type="button" onClick={() => this.removeItem(collectionNames.actors, actor)}>X</button></li>
                                    );
                                })}
                            </ul>
                        </Fragment>:null}
                        <br />

                        <label>Cover:</label>
                        <br />
                        <input type="text" name="cover" onChange={this.handleChange} />
                        <br />
                        <button type="submit">Create</button>
                    </form>
                }
            </div>
        );
    };
};

export default MovieCreate;
