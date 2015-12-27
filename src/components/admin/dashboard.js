import React from "react";
import director from "director";
import { logout } from "../../lib/auth";

export default React.createClass({

    logout: function () {
        logout();
        director.Router().setRoute("/admin/signin");
    },

    create: function () {
        director.Router().setRoute("/admin/create");
    },

    render: function () {
        return (
            <div>
                <h1>Welcome to the dashboard!!</h1>
                <button onClick={this.create} className="ui blue button">Create</button>
                <button onClick={this.logout} className="ui red button">Logout</button>
            </div>
        );
    }
});
