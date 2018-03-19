import React, { Component } from 'react';

class Dashboard extends Component {
    componentDidMount() {
        console.log('shit');
    }

    componentDidCatch(error, info) {
        console.log('info: ', info);
        console.log('error: ', error);
    }

    render() {
        return <p>I love tris</p>
    }
}

export default Dashboard;
