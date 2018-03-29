import React, { Fragment } from 'react';

import Navbar from './components/Navbar/index.jsx';
import Sidebar from './components/Sidebar/index.jsx';

const layout = props => (
    <Fragment>
        <Sidebar />
        <div className="main-panel">
            <Navbar title={props.title} />
            <div class="panel-header panel-header-sm"></div>
            <div className="content">
                <div className="row">{props.children}</div>
            </div>
        </div>
    </Fragment>
);

export default layout;
