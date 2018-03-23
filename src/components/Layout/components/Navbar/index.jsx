import React from 'react';

const navbar = props => (
    <nav className="navbar navbar-expand-lg navbar-absolute bg-primary fixed-top">
        <div className="container-fluid">
            <div className="navbar-wrapper">
                <div className="navbar-toggle">
                    <button type="button" className="navbar-toggler">
                        <div className="navbar-toggler-bar bar1" />
                        <div className="navbar-toggler-bar bar2" />
                        <div className="navbar-toggler-bar bar3" />
                    </button>
                </div>
                <a className="navbar-brand" href="#">
                    Dashboard
                </a>
            </div>
            <button
                type="button"
                aria-expanded="false"
                data-toggle="collapse"
                data-target="#navigation"
                className="navbar-toggler"
                aria-label="Toggle Navigation"
                aria-controls="navigation-index"
            >
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
                <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <div
                id="navigation"
                className="collapse navbar-collapse justify-content-end"
            >
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="now-ui-icons users_circle-08"></i>
                            <p>
                                User Name
                            </p>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                            <a href="#" className="dropdown-item">Log Out</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default navbar;
