"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var AuthorStore = require("../../stores/authorStore");
var AuthorActions = require("../../actions/authorActions");
var AuthorList = require("./authorList");

var AuthorPage = React.createClass({
    getInitialState: function () {
        return {
            authors: AuthorStore.getAllAuthors()
        };
    },

    // Anytime something changes, call onChange function
    componentWillMount: function () {
        AuthorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        AuthorStore.removeChangeListener(this._onChange);
    },

    // The fn that will run anytime the store changes
    _onChange: function () {
        debugger;
        this.setState({
            author: AuthorStore.getAllAuthors()
        });
    },
    
    render: function () {
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;