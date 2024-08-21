import React, { useState } from 'react';
import "./styles/courseAssignments.css";
import Assignment from "./Assignment";

export default function CourseAssignments() {
    const crypto = window.crypto || window.msCrypto;
    let array = new Uint32Array(1);

    const [assignments, setAssignments] = useState([]);

    const handleNewAssignment = () => {
        setAssignments([...assignments, { id: crypto.getRandomValues(array) }]);
    };

    const handleAssignmentDelete = (id) => {
        setAssignments(assignments.filter((assignment) => assignment.id !== id));
    };

    return (
        <div className="course-assignments">
            {assignments.map((assignment) => (
                <Assignment
                    key={assignment.id}
                    id={assignment.id}
                    name={assignment.name}
                    grade={assignment.grade}
                    weight={assignment.weight}
                    onDelete={handleAssignmentDelete}
                />
            ))}
            <button className="new-assignment-btn" onClick={handleNewAssignment}>New Assignment +</button>
        </div>
    )
}
