import React from "react";
import director from "director";
import { logout } from "../../lib/auth";

export default React.createClass({

    logout: function () {
        logout();
        director.Router().setRoute("/admin/signin");
    },

    render: function () {
        return (
            <div>
                <h1>Welcome to the dashboard!!</h1>
                <button onClick={this.logout} className="ui red button">Logout</button>
            </div>
        );
    }
});
