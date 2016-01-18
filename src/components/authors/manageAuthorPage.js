"use strict";

var React = require("react");
var Router = require("react-router");
var AuthorForm = require("./authorForm");
var AuthorApi = require("../../api/authorApi");
var toastr = require("toastr");

var ManageAuthorPage = React.createClass({
    // This navigation mixin comes with react router
    mixins: [
        Router.Navigation
    ],

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

    saveAuthor: function (event) {
        event.preventDefault();
        // Save our author to our mock API
        AuthorApi.saveAuthor(this.state.author);

        toastr.success("Author saved.");

        // transitionTo is available only when using Navigaiton mixin
        this.transitionTo("authors");
    },

    render: function () {
        return (
            <AuthorForm 
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor} />
        );
    }
});

module.exports = ManageAuthorPage;