import React, { useState } from 'react';
import "./styles/assignment.css";
import PropTypes from "prop-types";

export default function Assignment(props) {
    const [name, setName] = useState(props.assignmentName || "");
    const [grade, setGrade] = useState(props.grade || "");
    const [weight, setWeight] = useState(props.weight || "");
    const [editor, setEditor] = useState(null);

    const handleClick = (field) => {
        setEditor(field);
    };

    const handleChangingElement = (field) => {
        let potentialField = field === "grade" ? grade : weight;
        return editor === field ? (
            <input
                defaultValue={field === "name" ? name : potentialField}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.target.blur();
                }}
                onBlur={(e) => handleBlur(field, e.target.value)}
                autoFocus
            />
        ) : (
            <p>{field === "name" ? name : potentialField}</p>
        )
    }

    const handleBlur = (field, value) => {
        if (field === "name") {
            setName(value);
            props.onUpdate(props.id, { name: value });
        } else if (value === "" ||
            (!isNaN(value) &&
                parseFloat(value) >= 0 &&
                parseFloat(value) <= 100)
        ) {
            if (value === "") value = 0;
            if (field === "grade") {
                setGrade(value);
                props.onUpdate(props.id, { grade: value });
            } else if (field === "weight") {
                setWeight(value);
                props.onUpdate(props.id, { weight: value });
            }
        }
        setEditor(null);
    };

    return (
        <div className="assignment">
            <div>
                <div className="assignment-name">
                    Name:{""}
                    <button onClick={() => handleClick("name")}>
                        {handleChangingElement("name")}
                    </button>
                </div>
            </div>
            <div className="assignment-results">
                <div>
                    Grade %:{""}
                    <button className="final-grade" onClick={() => handleClick("grade")} id="final-grade">
                        {handleChangingElement("grade")}
                    </button>
                </div>
                <div>
                    Weight %:{""}
                    <button className="weighting" onClick={() => handleClick("weight")} id="weighting">
                        {handleChangingElement("weight")}
                    </button>
                </div>
                <button className="delete-assignment-btn" onClick={() => props.onDelete(props.id)}>x</button>
            </div>
        </div>
    )
}

Assignment.propTypes = {
    assignmentName: PropTypes.string.isRequired,
    id: PropTypes.isRequired,
    grade: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};
