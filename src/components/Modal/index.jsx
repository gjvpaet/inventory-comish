import React from 'react';

const modal = props => (
    <div
        role="dialog"
        tabIndex="-1"
        id={props.modalId}
        aria-hidden="true"
        className="modal fade"
        aria-labelledby="myLargeModalLabel"
    >
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.modalTitle}</h5>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        data-dismiss="modal"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer d-flex justify-content-between">
                    <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-default btn-round"
                    >
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary btn-round">Save</button>
                </div>
            </div>
        </div>
    </div>
);

export default modal;
