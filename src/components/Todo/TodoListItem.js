import React from 'react';

import PropTypes from 'prop-types';

const TodoListItem = ({ item, onToggle }) => {
    TodoListItem.propTypes = {
        item: PropTypes.object.isRequired,
        onToggle: PropTypes.func.isRequired
    };

    return (
        <div>
            <input type="checkbox" checked={item.completed} onChange={() => onToggle(item.id)} />
            {item.title}
        </div>
    )
}

export default TodoListItem;