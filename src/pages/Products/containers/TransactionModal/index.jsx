import moment from 'moment';
import { values } from 'lodash';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { HalfCircleSpinner } from 'react-epic-spinners';

import 'react-dates/initialize';

import 'react-dates/lib/css/_datepicker.css';

import { fetchTransactions } from '../../../../store/actions';

import Modal from '../../../../components/Modal/index.jsx';

import HttpService from '../../../../services/HttpService';

const httpService = new HttpService();

class TransactionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endDate: moment(),
            focusedInput: 'startDate',
            startDate: moment().subtract(7, 'days')
        };

        ['closeModal', 'dateChangeHandler', 'focusedInputChangeHandler'].map(
            fn => (this[fn] = this[fn].bind(this))
        );
    }

    dateChangeHandler(value) {
        this.setState({
            endDate: value.endDate,
            startDate: value.startDate
        });
    }

    focusedInputChangeHandler(focusedInput) {
        this.setState({ focusedInput });
    }

    closeModal() {}

    getColumns() {
        let columns = [
            {
                Header: 'Action'
            },
            {
                Header: 'Original Quantity'
            },
            {
                Header: 'Quantity'
            },
            {
                Header: 'New Quantity'
            },
            {
                Header: 'Product'
            },
            {
                Header: 'Total Price'
            },
            {
                Header: 'Date'
            }
        ];

        return columns;
    }

    render() {
        let columns = this.getColumns();

        let { data, fetchLoading } = this.props;
        let { endDate, focusedInput, startDate } = this.state;

        return (
            <Modal
                formId="transaction-form"
                modalId="transactions-modal"
                closeModal={this.closeModal}
                modalTitle="View Transactions"
            >
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <DateRangePicker
                                minimumNights={0}
                                endDate={endDate}
                                endDateId="EndDate"
                                startDate={startDate}
                                startDateId="StartDate"
                                isOutsideRange={() => {}}
                                showDefaultInputIcon={true}
                                focusedInput={focusedInput}
                                onDatesChange={this.dateChangeHandler}
                                onFocusChange={this.focusedInputChangeHandler}
                            />
                            &nbsp; &nbsp;
                            <button
                                type="button"
                                className="btn btn-default btn-round"
                            >
                                GO
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <ReactTable 
                                filterable
                                data={data}
                                columns={columns}
                                defaultPageSize={10}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-start">
                    <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-default btn-round"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: values(state.transactions.data),
        fetchLoading: state.transactions.fetchLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTransactions: data => dispatch(fetchTransactions(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
