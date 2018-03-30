import { connect } from 'react-redux';
import React, { Component } from 'react';

import Modal from '../../../../components/Modal/index.jsx';

class ProductModal extends Component {
    render() {
        return (
            <Modal modalTitle="Add New Product" modalId="products-modal">
                <form>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="Description">
                                    Description{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    type="text"
                                    id="Description"
                                    name="Description"
                                    className="form-control"
                                    placeholder="Enter Product Description"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="BasePrice">
                                    Base Price{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    type="number"
                                    id="BasePrice"
                                    name="BasePrice"
                                    className="form-control"
                                    placeholder="Enter Base Price"
                                />
                            </div>
                        </div>
                        <div className="col-ms-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="SellingPrice">
                                    Selling Price{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    type="number"
                                    id="SellingPrice"
                                    name="SellingPrice"
                                    className="form-control"
                                    placeholder="Enter Selling Price"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="Quantity">
                                    Quantity{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    id="Quantity"
                                    type="number"
                                    name="Quantity"
                                    className="form-control"
                                    placeholder="Enter Quantity"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                            <div className="form-group">
                                <label htmlFor="WarningQuantity">
                                    Warning Quantity{' '}
                                    <i className="fa fa-asterisk text-danger" />
                                </label>
                                <input
                                    type="number"
                                    id="WarningQuantity"
                                    name="WarningQuantity"
                                    className="form-control"
                                    placeholder="Enter Warning Quantity"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default ProductModal;
