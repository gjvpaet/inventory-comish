import { values } from 'lodash';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners';

import { fetchProducts, modifyProduct } from '../../store/actions';

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
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdqdnBhZXRAZ21haWwuY29tIiwidXNlcklkIjoiNWFhYzViNTdmN2M3ZDY3OTdmZjUwZGI4IiwiaWF0IjoxNTIyNDI1NDkwLCJleHAiOjE1MjI0MjkwOTB9.qcszHmTxCbMmrAi2tazU_XqCUye0DPbrJuvPvh7PX90',
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

    modifyProduct(id) {
        this.props.modifyProduct(id);
        $('#products-modal').modal('show');
    }

    render() {
        let columns = this.getColums();
        let { data, fetchLoading } = this.props;

        return (
            <Layout title="Products">
                <div className="col-md-12">
                    <Card cardTitle="Products Table">
                        <ReactTable
                            filterable
                            data={data}
                            columns={columns}
                            defaultPageSize={10}
                            loading={fetchLoading}
                            className="-striped -highlight"
                            loadingText={
                                <div style={{ display: 'inline-block' }}>
                                    <SemipolarSpinner
                                        color="black"
                                        size={100}
                                    />
                                </div>
                            }
                        />
                    </Card>
                    <FAB onClick={() => this.modifyProduct('')} />
                </div>
                <ProductModal />
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: values(state.products.data),
        fetchLoading: state.products.fetchLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        modifyProduct: id => dispatch(modifyProduct(id)),
        fetchProducts: data => dispatch(fetchProducts(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
