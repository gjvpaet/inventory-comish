import { values } from 'lodash';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import actions from '../../store/actions';

import Layout from '../../components/Layout/index.jsx';

import HttpService from '../../services/HttpService';

const httpService = new HttpService();

class Products extends Component {
    async componentDidMount() {
        let { fetchProducts } = this.props;

        try {
            let result = await httpService.getAllData('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIyMDYzNDI5LCJleHAiOjE1MjIwNjcwMjl9.g23tHa5WqLY3csoomCLYNx7OYpb3EY0ZQTKBw2XrKgQ', 'products');
            console.log('result: ', result);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    render() {
        return <Layout title="Products" />;
    }
}

const mapStateToProps = state => {
    return {
        data: values(state.products.data)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProducts: data => dispatch(actions.fetchProducts(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
