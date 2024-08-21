"use client";

import Title from "@/components/title";
import TodoCreateButton from "@/components/Todo/TodoCreateButton";
import TodoList from "@/components/Todo/TodoList";
import { React, useState } from "react";

import TodoCreateModal from "@/components/Todo/TodoCreateModal";
import "./todo.css";

export default function TodoPage() {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleCreateTodo = (title, description) => {
    const newTodo = {
      id: items.length + 1,
      title,
      description,
      completed: false,
    };
    setItems([...items, newTodo]);
  };

  return (
    <main>
      <div id="todo-bar">
        <Title text="Todo list" />
        <TodoCreateButton onOpen={handleOpenModal} />
      </div>
      <p style={{ display: items.length == 0 ? "block" : "none" }}>
        Click on the '+' button to create a new Todo Item.
      </p>
      <TodoList items={items} />

      <TodoCreateModal
        onClose={handleCloseModal}
        onCreate={handleCreateTodo}
        showing={isModalVisible}
      />
    </main>
  );
}
