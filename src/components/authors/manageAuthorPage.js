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

    statics: {
        // comes with react router
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm("Leave without saving?")) {
                transition.abort();
            }
        }
    },

    getInitialState: function () {
        return {
            author: {
                id: "",
                firstName: "",
                lastName: ""
            },
            errors : {},
            dirty: false
        };
    },

    // React lifecycle function.
    // Called by convention before the component has been mounted.
    // Here it is better to use it then componentDidMount because calling setState 
    // in this fn will not cause the re-render
    componentWillMount: function () {
        var authorId = this.props.params.id; // From the path '/author:id'

        // Check needed because this segment wont be in url when we are adding the author
        // remember, this component is used both for adding and for editing authors
        if (authorId) {
            this.setState({
                author: AuthorApi.getAuthorById(authorId)
            });
        }
    },

    // Called for every key press
    setAuthorState: function (event) {
        var field = event.target.name,
            value = event.target.value;

        this.setState({
            dirty: true
        });

        this.state.author[field] = value;

        return this.setState({
            author: this.state.author
        });
    },

    authorFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {}; // Clear any previous errors

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = "First name must be at least 3 characters";
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = "Last name must be at least 3 characters";
            formIsValid = false;
        }

        // Any time we want to change state, we need to call .setState() to do so
        this.setState({
            errors: this.state.errors
        });

        return formIsValid;
    },

    saveAuthor: function (event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }

        // Save our author to our mock API
        AuthorApi.saveAuthor(this.state.author);
        this.setState({
            dirty: false
        });
        toastr.success("Author saved.");
        // transitionTo is available only when using Navigaiton mixin
        this.transitionTo("authors");
    },

    // If a required prop is omitted, the message is logged in browser
    render: function () {
        return (
            <AuthorForm 
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors} />
        );
    }
});

module.exports = ManageAuthorPage;