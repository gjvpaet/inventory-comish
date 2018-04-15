import React, { Component } from 'react';

class Index extends Component {
    componentDidMount() {
        let token = localStorage.getItem('token');
        console.log('token: ', token);

        if (token) {
            location.href = `${siteUrl}dashboard`;
        } else {
            location.href = `${siteUrl}login`;
        }
    }

    render() {
        return null;
    }
}

export default Index;