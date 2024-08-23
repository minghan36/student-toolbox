"use client";

import Title from "@/components/title";
import TodoCreateButton from "@/components/Todo/TodoCreateButton";
import TodoList from "@/components/Todo/TodoList";
import { React, useEffect, useState } from "react";

import TodoCreateModal from "@/components/Todo/TodoCreateModal";
import { useSession } from "next-auth/react";
import "./todo.css";

export default function TodoPage() {
  const session = useSession();

  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!session?.data?.user?.name) {
        return;
      }

      const username = session.data.user.name;
      const res = await fetch(`/api/user/${username}/todo`);

      if (!res.ok) {
        const resBody = await res.json();
        alert(resBody.error);
        return;
      }

      const todos = await res.json();
      setItems(todos);
    };

    fetchTodos();
  }, [session?.data?.user?.name]);

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const handleCreateTodo = async (title, description) => {
    if (!session?.data?.user?.name) {
      alert("You must be logged in to create a todo item.");
      return;
    }

    const newTodo = {
      id: items.length + 1,
      title,
      description,
      completed: false,
    };

    const username = session.data.user.name;
    const res = await fetch(`/api/user/${username}/todo`, {
      method: "POST",
      body: JSON.stringify(newTodo),
    });

    if (!res.ok) {
      const resBody = await res.json();
      alert(resBody.error);
      return;
    }

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
      <TodoList todoItems={items} setItems={setItems} />

      <TodoCreateModal
        onClose={handleCloseModal}
        onCreate={handleCreateTodo}
        showing={isModalVisible}
      />
    </main>
  );
}
