import { connect } from 'react-redux';
import React, { Component } from 'react';

import { setSelectedProduct } from '../../../../store/actions';

import Modal from '../../../../components/Modal/index.jsx';

class ProductModal extends Component {
    constructor(props) {
        super(props);

        // ['handleSubmit'].map(fn => (this[fn] = this[fn].bind(this)));
    }

    componentDidMount() {
        $('#product-form')
            .validator(this.props.selected ? 'validate' : 'update')
            .on('submit', e => {
                console.log('tangina mo teejay');
            });
    }

    handleChange(field, value) {
        this.props.setSelectedProduct({ field, value });
    }

    render() {
        console.log('selected: ', this.props.selected);
        let { selected, formAction, formLoading } = this.props;

        let {
            Quantity = 0,
            BasePrice = 0,
            Description = '',
            SellingPrice = 0,
            WarningQuantity = 0
        } =
            selected || {};

        return (
            <Modal modalTitle="Add New Product" modalId="products-modal" formId="product-form">
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="Description">
                                    Description{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    required
                                    type="text"
                                    id="Description"
                                    name="Description"
                                    value={Description}
                                    className="form-control"
                                    placeholder="Enter Product Description"
                                    onChange={e =>
                                        this.handleChange(
                                            'Description',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="BasePrice">
                                    Base Price{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="BasePrice"
                                    name="BasePrice"
                                    value={BasePrice}
                                    className="form-control"
                                    placeholder="Enter Base Price"
                                    onChange={e =>
                                        this.handleChange(
                                            'BasePrice',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-ms-6 col-sm-6 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="SellingPrice">
                                    Selling Price{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="SellingPrice"
                                    name="SellingPrice"
                                    value={SellingPrice}
                                    className="form-control"
                                    placeholder="Enter Selling Price"
                                    onChange={e =>
                                        this.handleChange(
                                            'SellingPrice',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="Quantity">
                                    Quantity{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    required
                                    id="Quantity"
                                    type="number"
                                    name="Quantity"
                                    value={Quantity}
                                    className="form-control"
                                    placeholder="Enter Quantity"
                                    onChange={e =>
                                        this.handleChange(
                                            'Quantity',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group has-feedback">
                                <label htmlFor="WarningQuantity">
                                    Warning Quantity{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    required
                                    type="number"
                                    id="WarningQuantity"
                                    name="WarningQuantity"
                                    value={WarningQuantity}
                                    className="form-control"
                                    placeholder="Enter Warning Quantity"
                                    onChange={e =>
                                        this.handleChange(
                                            'WarningQuantity',
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-default btn-round"
                    >
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary btn-round">
                        Save
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        selected: state.products.selected,
        formAction: state.products.formAction,
        formLoading: state.products.formLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSelectedProduct: data => dispatch(setSelectedProduct(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
