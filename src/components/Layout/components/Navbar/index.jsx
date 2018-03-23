import React from 'react';

const navbar = props => (
    <nav className="navbar navbar-expand-lg navbar-absolute bg-primary fixed-top">
        <div className="container-fluid">
            <div className="navbar-wrapper">
                <button type="button" className="navbar-toggler">
                    <div className="navbar-toggler-bar bar1"></div>
                    <div className="navbar-toggler-bar bar2"></div>
                    <div className="navbar-toggler-bar bar3"></div>
                </button>
            </div>
        </div>
    </nav>
);

export default navbar;