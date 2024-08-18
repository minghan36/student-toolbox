import React from 'react';
import PropTypes from 'prop-types';

export default function TodoCreateButton({ onOpen }) {
    TodoCreateButton.propTypes = {
        onOpen: PropTypes.func.isRequired
    };

    return (
        <button onClick={onOpen}>New Todo Item +</button>
    );
}