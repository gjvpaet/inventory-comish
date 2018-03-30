import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { push } from 'react-router-redux';

class Sidebar extends Component {
    render() {
        let { location } = this.props;

        return (
            <div className="sidebar" data-color="orange">
                <div className="logo">
                    <a href="#" className="simple-text logo-mini">
                        OUA
                    </a>
                    <a href="#" className="simple-text logo-normal">
                        Inventory System
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <div className="nav">
                        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                            <Link to="/dashboard">
                                <i className="now-ui-icons design_app" />
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className={location.pathname === '/products' ? 'active' : ''}>
                            <Link to="/products">
                                <i className="now-ui-icons shopping_cart-simple" />
                                <p>Products</p>
                            </Link>
                        </li>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        location: state.router.location
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redirect: path => dispatch(push(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
