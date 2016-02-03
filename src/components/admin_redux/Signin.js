import React from "react";

const Signin = React.createClass({
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
                            {/*{ this.state.error.state ? <ErrorMessage errorMessage={this.state.error.message}/> : <noscript/> }*/}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
});

export default Signin;
