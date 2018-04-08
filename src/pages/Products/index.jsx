import { values } from 'lodash';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { ChildButton } from 'react-mfb';
import React, { Component } from 'react';
import { SemipolarSpinner } from 'react-epic-spinners';

import 'react-mfb/mfb.css';
import 'react-tippy/dist/tippy.css';
import 'react-table/react-table.css';

import { setProduct, fetchProducts, deleteProduct } from '../../store/actions';

import StockModal from './containers/StockModal/index.jsx';
import ProductModal from './containers/ProductModal/index.jsx';
import TransactionModal from './containers/TransactionModal/index.jsx';

import FAB from '../../components/FAB/index.jsx';
import Card from '../../components/Card/index.jsx';
import Layout from '../../components/Layout/index.jsx';

import HttpService from '../../services/HttpService';

const httpService = new HttpService();

class Products extends Component {
    constructor(props) {
        super(props);

        ['addProduct', 'getProducts'].map(
            fn => (this[fn] = this[fn].bind(this))
        );
    }

    async componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        let { fetchProducts } = this.props;

        try {
            let result = await httpService.getAllData(token, 'products');

            fetchProducts(result.list);
        } catch (error) {
            console.log('error: ', error);
        }
    }

    getColums() {
        return [
            {
                Header: 'Stocks',
                Cell: props => (
                    <div className="text-center">
                        <Tooltip
                            title="Add Stock"
                            position="bottom"
                            animation="scale"
                        >
                            <button
                                className="btn btn-primary btn-fab btn-icon btn-round"
                                onClick={e =>
                                    this.modifyStock(props.original, 'ADD')
                                }
                            >
                                <i className="now-ui-icons ui-1_simple-add" />
                            </button>
                        </Tooltip>
                        &nbsp;
                        <Tooltip
                            title="Reduce Stock"
                            position="right"
                            animation="scale"
                        >
                            <button
                                className="btn btn-danger btn-fab btn-icon btn-round"
                                onClick={e =>
                                    this.modifyStock(props.original, 'SUBTRACT')
                                }
                            >
                                <i className="now-ui-icons ui-1_simple-delete" />
                            </button>
                        </Tooltip>
                    </div>
                ),
                Filter: () => {}
            },
            {
                Header: 'Description',
                accessor: 'Description',
                filterMethod: (filter, row) => {
                    let value = filter.value.toLowerCase();
                    let description = row[filter.id].toLowerCase();

                    return description.includes(value) ? row : '';
                },
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
                Cell: props => {
                    return (
                        <div className="text-center">
                            <Tooltip
                                title="Edit"
                                position="left"
                                animation="scale"
                            >
                                <button
                                    className="btn btn-primary btn-fab btn-icon btn-round"
                                    onClick={e =>
                                        this.editProduct(e, props.original)
                                    }
                                >
                                    <i className="now-ui-icons design-2_ruler-pencil" />
                                </button>
                            </Tooltip>
                            &nbsp;
                            <Tooltip
                                title="Delete"
                                position="bottom"
                                animation="scale"
                            >
                                <button
                                    className="btn btn-danger btn-fab btn-icon btn-round"
                                    onClick={e =>
                                        this.deleteProduct(props.original.Id)
                                    }
                                >
                                    <i className="now-ui-icons ui-1_simple-remove" />
                                </button>
                            </Tooltip>
                        </div>
                    );
                },
                Filter: () => {}
            }
        ];
    }

    addProduct(event) {
        this.props.setProduct({ formAction: 'POST' });
        $('#products-modal').modal('show');
        $('#product-form').validator();
    }

    editProduct(event, product) {
        this.props.setProduct({
            formAction: 'PUT',
            selected: {
                ...product,
                WarningQuantity: product.Inventory.WarningQuantity
            }
        });

        $('#products-modal').modal('show');
        $('#product-form').validator();
    }

    deleteProduct(id) {
        alertify.confirm(
            'Warning',
            'Are you sure you want to delete this?',
            async () => {
                try {
                    let result = await httpService.deleteData(
                        token,
                        id,
                        'products'
                    );

                    this.props.deleteProduct(id);

                    alertify.success(result.message);
                } catch (error) {
                    console.log('error: ', error);
                    alertify.error('Oops, something went wrong.');
                }
            },
            () => {}
        );
    }

    openTransactionModal() {
        $('#transactions-modal').modal('show');
    }

    modifyStock(product, action) {
        this.props.setProduct({
            selectedStocks: {
                ...product,
                Quantity: 0,
                Action: action,
                InventoryId: product.Inventory.Id,
                OriginalQuantity: product.Inventory.Quantity
            },
            formAction: 'PUT'
        });

        $('#stocks-modal').modal('show');
        $('#stock-form').validator();
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
                    <FAB
                        position="br"
                        method="hover"
                        effect="slidein-spring"
                        mainBtnStyle={{ color: 'white' }}
                        mainBtnIconActive="now-ui-icons ui-1_simple-remove"
                        mainBtnIconResting="now-ui-icons design_bullet-list-67"
                    >
                        <ChildButton
                            label="Add Product"
                            onClick={this.addProduct}
                            style={{ color: 'white' }}
                            icon="now-ui-icons ui-1_simple-add"
                        />
                        <ChildButton
                            label="Transactions"
                            style={{ color: 'white' }}
                            icon="now-ui-icons files_paper"
                            onClick={this.openTransactionModal}
                        />
                    </FAB>
                </div>
                <ProductModal />
                <StockModal />
                <TransactionModal />
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
        setProduct: data => dispatch(setProduct(data)),
        deleteProduct: id => dispatch(deleteProduct(id)),
        fetchProducts: data => dispatch(fetchProducts(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
