import React from 'react';
import PropTypes from 'prop-types';

export default function TodoCreateButton({ onOpen }) {
    TodoCreateButton.propTypes = {
        onOpen: PropTypes.func.isRequired
    };

    return (
        <div>
            <button onClick={onOpen} style={{ padding: '10px' }}>+</button>
        </div>
    );
}