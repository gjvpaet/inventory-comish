import React from 'react';

const sidebar = props => (
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
            <ul className="nav">
                <li className="active">
                    <a href="#">
                        <i class="now-ui-icons design_app"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="now-ui-icons shopping_cart-simple"></i>
                        <p>Products</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
);

export default sidebar;