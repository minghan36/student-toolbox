"use client";

import React, { useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";

export default function TodoList({ items }) {
    TodoList.propTypes = {
        items: PropTypes.array.isRequired,
    };

    const [todoItems, setTodoItems] = useState(items);

    useEffect(() => {
        setTodoItems(items);
    }, [items]);

    const handleToggle = (id) => {
        const updatedItems = todoItems.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        setTodoItems(updatedItems);
    };

    return (
        <ul>
            {todoItems.map((item) => (
                <TodoListItem key={item.id} item={item} onToggle={handleToggle} />
            ))}
        </ul>
    );
}
