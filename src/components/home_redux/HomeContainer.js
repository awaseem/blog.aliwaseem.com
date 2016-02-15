import React from "react";
import Header from "./header";
import BlogPosts from "./BlogPosts";

export default React.createClass({
    render: function () {
        return (
            <div>
                <Header/>
                <BlogPosts/>
            </div>
        );
    }
});
