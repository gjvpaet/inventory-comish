import React from 'react';
import { Menu, MainButton, ChildButton } from 'react-mfb';

const fab = props => (
    <Menu effect="slidein-spring" method="click" position="br">
        <MainButton
            style={{ color: 'white' }}
            iconActive="now-ui-icons ui-1_simple-remove"
            iconResting="now-ui-icons design_bullet-list-67"
        />
        <ChildButton
            label="Add Product"
            style={{ color: 'white' }}
            icon="now-ui-icons ui-1_simple-add"
        />
    </Menu>
);

export default fab;
