"use strict";

var React = require("react");
var AuthorForm = require("./authorForm");

var ManageAuthorPage = React.createClass({
    getInitialState: function () {
        return {
            author: {
                id: "",
                firstName: "",
                lastName: ""
            }
        };
    },

    // Called for every key press
    setAuthorState: function (event) {
        var field = event.target.name,
            value = event.target.value;

        this.state.author[field] = value;

        return this.setState({
            author: this.state.author
        });
    },

    render: function () {
        return (
            <AuthorForm 
                author={this.state.author}
                onChange={this.setAuthorState} />
        );
    }
});

module.exports = ManageAuthorPage;