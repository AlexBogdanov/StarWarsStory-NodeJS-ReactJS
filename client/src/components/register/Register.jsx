import React, { Component } from 'react';
import './Register.css';
import Loader from 'react-loader-spinner';

import userService from './../../services/user-service';
import { errorNotifs } from './../../constants/notification-messages';
import { OK } from './../../constants/http-responses';
import { notifTypes } from './../../constants/common';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.state.username.length < 3) {
            this.props.notifHandler(errorNotifs.USERNAME_SHOULD_BE_ATLEAST_3_CHARACTERS_LONG, notifTypes.error);
            return;
        }

        if (this.state.password.length < 6) {
            this.props.notifHandler(errorNotifs.PASSWORD_SHOULD_BE_ATLEAST_6_CHARACTERS_LONG, notifTypes.error);
            return;
        }

        if (this.state.password !== this.state.repeatPassword) {
            this.props.notifHandler(errorNotifs.PASSWORDS_DO_NOT_MATCH, notifTypes.error);
            return;
        }

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        this.setState({ isLoading: true });

        userService.register(user)
          .then(res => {
            if (res.status === OK) {
                res.json().then(response => {
                    this.props.notifHandler(response.data.msg, notifTypes.success);
                    setTimeout(() => { window.location.href = '/'; }, 2000);
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
            <div className="Register">
                {this.state.isLoading ?
                <Loader type="Ball-Triangle" color="#00BFFF" height="750" />
                :
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <br />
                    <input name="username" type="text" onChange={this.handleChange} />
                    <br />
                    <label>Email:</label>
                    <br />
                    <input name="email" type="email" onChange={this.handleChange} />
                    <br />
                    <label>Password:</label>
                    <br />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <br />
                    <label>Repeat password:</label>
                    <br />
                    <input name="repeatPassword" type="password" onChange={this.handleChange} />
                    <br />
                    <button type="submit">Register</button>
                </form>
                }
            </div>
        );
    };
};

export default Register;
