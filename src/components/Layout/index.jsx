import React, { Fragment } from 'react';

import Navbar from './components/Navbar/index.jsx';
import Sidebar from './components/Sidebar/index.jsx';

const layout = props => (
    <Fragment>
        <Sidebar />
        <div className="main-panel">
            <Navbar title={props.title} />
            <div className="content">{props.children}</div>
        </div>
    </Fragment>
);

export default layout;