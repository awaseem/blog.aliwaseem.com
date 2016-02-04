import React from "react";
import director from "director";
import { connect } from "react-redux";
import { signInAdmin } from "../../actions/action";
import ErrorMessage from "../messages/error";
import { ADMIN_TOKEN, ERROR, ERROR_MESSAGE } from "../../schema/stateTree";

const Signin = React.createClass({

    submitHandler: function (e) {
        e.preventDefault();
        this.props.dispatch(signInAdmin(this.refs.username.value.trim(),
                                        this.refs.password.value.trim(),
                                        () => director.Router().setRoute("/admin/dashboard")
        ));
    },

    render: function () {
        return (
            <div id="signin" className="container">
                <div className="row">
                    <h3 className="center aligned header">Welcome Back!</h3>
                </div>
                <form onSubmit={this.submitHandler}>
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
                            { this.props.error ? <ErrorMessage errorMessage={this.props.errorMessage}/> : <noscript/> }
                        </div>
                    </div>
                </form>
            </div>
        );
    }

});

function mapStateToProps(state) {
    return {
        adminToken: state.get(ADMIN_TOKEN),
        error: state.get(ERROR),
        errorMessage: state.get(ERROR_MESSAGE)
    };
}

export default connect(mapStateToProps)(Signin);
