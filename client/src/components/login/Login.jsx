import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import userService from './../../services/user-service';
import { OK } from './../../constants/http-responses';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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

        const user = {
            username: this.state.username,
            password: this.state.password
        };
        
        const promise = userService.login(user);
        promise
            .then(res => {
                if (res.status === OK) {
                    res.json()
                        .then(data => {
                            localStorage.setItem('user', data.result);
                            NotificationManager.success(data.message);
                            window.location.href = '/';
                        });
                } else {
                    res.json()
                        .then(err => {
                            NotificationManager.error(err.message);
                        });
                }
            })
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <br />
                    <input name="username" type="text" onChange={this.handleChange} />
                    <br />
                    <label>Password:</label>
                    <br />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <br />
                    <button type="submit">Login</button>
                </form>

                <NotificationContainer />
            </div>
        );
    };
};

export default Login;
