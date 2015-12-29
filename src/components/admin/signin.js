import React from "react";
import director from "director";
import token from "../../lib/tokenStorage";
import ErrorMessage from "../messages/error";
import { login } from "../../lib/auth";

export default React.createClass({

    getInitialState: function () {
        return {
            error: {
                state: false,
                message: ""
            }
        };
    },

    componentDidMount: function () {
        $('#signin')
            .transition('fly down in');
    },

    handleLogin: function (e) {
        e.preventDefault();
        // Reset error state when clicked
        this.setState({
            error: {
                state: false,
                message: ""
            }
        });
        // Assign and check if proper values have been assigned, if not throw an
        // error message to the user
        let username = this.refs.username.value.trim();
        let password = this.refs.password.value.trim();
        if (!username && !password) {
            return this.setState({
                error: {
                    state: true,
                    message: "You need a username and password to login!"
                }
            });
        }
        else if (!username) {
            return this.setState({
                error: {
                    state: true,
                    message: "You need a username to login!"
                }
            });
        }
        else if (!password) {
            return this.setState({
                error: {
                    state: true,
                    message: "You need a password to login!"
                }
            });
        }

        login(username, password)
            .then((data) => {
                token.setToken(data.token);
                director.Router().setRoute("/admin/dashboard");
            })
            .catch((err) => {
                if (err.response) {
                    err.response.json()
                        .then((errResponse) => {
                            this.setState({
                                error: {
                                    state: true,
                                    message: errResponse.message
                                }
                            });
                        });
                }
                else {
                    this.setState({
                        error: {
                            state: true,
                            message: "Sorry can't reach the server at the moment"
                        }
                    });
                }
            });
    },

    render: function () {
        return (
            <div id="signin" className="ui container">
                <div className="ui three column centered grid container">
                    <div className="row"/>
                    <div className="row"/>
                    <div className="center aligned row">Welcome Back!</div>
                    <div className="column">
                        <form className="ui form error" onSubmit={this.handleLogin}>
                            <div className="field">
                                <label>Username</label>
                                <input type="text" ref="username"/>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <input type="password" ref="password"/>
                            </div>
                            <div className="field">
                                <button className="ui teal button" type="submit">Login</button>
                            </div>
                            { this.state.error.state ? <ErrorMessage errorMessage={this.state.error.message}/> : <noscript/> }
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});
