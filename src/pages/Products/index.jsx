import { values } from 'lodash';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Menu, MainButton, ChildButton } from 'react-mfb';

import actions from '../../store/actions';

import Layout from '../../components/Layout/index.jsx';

import HttpService from '../../services/HttpService';

const httpService = new HttpService();

class Products extends Component {
    constructor(props) {
        super(props);

        ['getProducts'].map(fn => (this[fn] = this[fn].bind(this)));
    }

    async componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        let { fetchProducts } = this.props;

        try {
            let result = await httpService.getAllData(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIyMzIxNTc3LCJleHAiOjE1MjIzMjUxNzd9.rPzuT2LpKfSUU4WyOhbFsxqnSTgJBtXoHxdVNVxicrE',
                'products'
            );
            console.log('result: ', result);
            fetchProducts(result.list);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    getColums() {
        return [
            {
                Header: 'Description',
                accessor: 'Description',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Base Price',
                accessor: 'BasePrice',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Selling Price',
                accessor: 'SellingPrice',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Quantity',
                accessor: d => d.Inventory.Quantity,
                id: 'Quantity',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Warning Quantity',
                accessor: d => d.Inventory.WarningQuantity,
                id: 'WarningQuantity',
                Cell: props => <div className="text-center">{props.value}</div>
            },
            {
                Header: 'Actions',
                Filter: () => {}
            }
        ];
    }

    render() {
        let { data } = this.props;
        console.log('data: ', data);
        let columns = this.getColums();

        return (
            <Layout title="Products">
                <ReactTable
                    filterable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                />
                <Menu effect="slidein-spring" method="click" position="br">
                    <MainButton
                        style={{ color: 'white' }}
                        iconActive="now-ui-icons ui-1_simple-remove"
                        iconResting="now-ui-icons design_bullet-list-67"
                    />
                    <ChildButton
                        label="Add Product"
                        style={{ color: 'white' }}
                        icon="now-ui-icons ui-1_simple-add"
                    />
                </Menu>
            </Layout>
        );
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
