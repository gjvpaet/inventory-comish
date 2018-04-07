import { connect } from 'react-redux';
import React, { Component } from 'react';
import { HalfCircleSpinner } from 'react-epic-spinners';

import { setProduct } from '../../../../store/actions';

import Modal from '../../../../components/Modal/index.jsx';

import config from '../../../../../config';

import HttpService from '../../../../services/HttpService';

const httpService = new HttpService();

class StockModal extends Component {
    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(field, value) {
        let { selectedStocks, setProduct } = this.props;

        setProduct({ selectedStocks: { ...selectedStocks, [field]: value } });
    }

    closeModal() {
        this.props.setProduct({ formAction: 'POST', selectedStocks: null });
    }

    render() {
        let { formLoading, selectedStocks } = this.props;
        console.log('selectedStocks: ', selectedStocks);

        let { Action = 'ADD', Quantity = 0 } = selectedStocks || {};

        return (
            <Modal
                formId="stock-form"
                modalId="stocks-modal"
                modalTitle="Modify Stocks"
                closeModal={this.closeModal}
            >
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
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
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button
                        type="button"
                        data-dismiss="modal"
                        onClick={this.closeModal}
                        className="btn btn-default btn-round"
                    >
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary btn-round">
                        {formLoading ? (
                            <HalfCircleSpinner size={20} color="black" />
                        ) : (
                            'Save'
                        )}
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        formAction: state.products.formAction,
        formLoading: state.products.formLoading,
        selectedStocks: state.products.selectedStocks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setProduct: data => dispatch(setProduct(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StockModal);
