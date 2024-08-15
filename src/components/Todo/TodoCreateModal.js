import React from "react"
import { useState } from "react"
import "./TodoCreateModal.css";

import PropTypes from "prop-types";

export default function TodoCreateModal({ visible, onClose, onCreate }) {
    TodoCreateModal.propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        onCreate: PropTypes.func.isRequired
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const modalVisible = { display: visible ? 'block' : 'none' };

    const handleCreate = (event) => {
        event.preventDefault();
        if (title && description) {
            onCreate(title, description);
            setTitle("");
            setDescription("");
        }
    };


    return (
        <div id="todo-create-modal" style={modalVisible}>
            <div className="title-bar">
                <h1>Create New Todo Item</h1>
                <button id="todo-create-modal-close-button" onClick={onClose}>X</button>
            </div>

            <form id="todo-create-modal-form" onSubmit={handleCreate}>
                <label>
                    Title
                    <input
                        type="text"
                        placeholder="Enter a title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label>
                    Description
                    <textarea
                        placeholder="Enter a description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}
