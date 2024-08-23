"use client";

import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import React from "react";
import "./styles/todoList.css";
import TodoListItem from "./TodoListItem";

export default function TodoList({ todoItems, setItems }) {
  TodoList.propTypes = {
    todoItems: PropTypes.arrayOf.isRequired,
    setItems: PropTypes.func.isRequired,
  };

  const session = useSession();

  const handleToggle = async (id) => {
    if (!session?.data?.user?.name) {
      alert("You must be logged in to update a todo item.");
      return;
    }

    const username = session.data.user.name;

    const res = await fetch(`/api/user/${username}/todo`, {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      alert("Failed to update todo item.");
      return;
    }

    const updatedItems = todoItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setItems(updatedItems);
  };

  return (
    <div className="todo-list">
      {todoItems.map((item) => (
        <TodoListItem key={item.id} item={item} onToggle={handleToggle} />
      ))}
    </div>
  );
}
