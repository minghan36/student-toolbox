import React from 'react';
import './styles/todoListItem.css';

import PropTypes from 'prop-types';

const TodoListItem = ({ item, onToggle }) => {
    TodoListItem.propTypes = {
        item: PropTypes.object.isRequired,
        onToggle: PropTypes.func.isRequired
    };

    const itemStrikethrough = item.completed ? 'todo-list-item-complete' : 'todo-list-item';

    return (
        <div className={itemStrikethrough + ' todo-list-item'}>
            {item.title}
            <input type="checkbox" checked={item.completed} onChange={() => onToggle(item.id)} />
        </div>
    )
}

export default TodoListItem;