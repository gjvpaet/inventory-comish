import { values } from 'lodash';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import actions from '../../store/actions';

import ProductModal from './containers/ProductModal/index.jsx';

import FAB from '../../components/FAB/index.jsx';
import Card from '../../components/Card/index.jsx';
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
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIyMzc4MDc3LCJleHAiOjE1MjIzODE2Nzd9.6yIvxChNN_NlNVNED0b5RnEDPO7LgM-2rKyF67ViquE',
                'products'
            );

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
        let columns = this.getColums();

        return (
            <Layout title="Products">
                <div className="col-md-12">
                    <Card cardTitle="Products Table">
                        <ReactTable
                            filterable
                            data={data}
                            columns={columns}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </Card>
                    <FAB onClick={() => $('#products-modal').modal('show')} />
                </div>
                <ProductModal />
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
