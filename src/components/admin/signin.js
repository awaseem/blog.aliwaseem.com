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
            .transition('fade in');
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
                console.error(err);
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
            <div id="signin" className="container">
                <div className="row">
                    <h3 className="center aligned header">Welcome Back!</h3>
                </div>
                <form onSubmit={this.handleLogin}>
                    <div className="row">
                        <div className="four columns  offset-by-four">
                            <label>Username</label>
                            <input className="u-full-width" type="text" ref="username"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="four columns offset-by-four">
                            <label>Password</label>
                            <input className="u-full-width" type="password" ref="password"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="four columns offset-by-four">
                            <button className="ui teal button" type="submit">Login</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="four columns offset-by-four">
                            { this.state.error.state ? <ErrorMessage errorMessage={this.state.error.message}/> : <noscript/> }
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});
