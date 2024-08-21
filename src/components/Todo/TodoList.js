"use client";

import React, { useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";
import "./styles/todoList.css";

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
        <div className="todo-list">
            {todoItems.map((item) => (
                <TodoListItem key={item.id} item={item} onToggle={handleToggle} />
            ))}
        </div>
    );
}
