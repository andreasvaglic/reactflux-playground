"use strict";

var React = require("react");

var Home = React.createClass({
    render: function () {
        // Parentheses needed if you have multiple lines of JSX inside return
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration</h1>
                <p>React, React Router and Flux for ultra responsive web apps.</p>
            </div>
        );
    }
});

// This is to make it usable elsewere in the application
module.exports = Home;