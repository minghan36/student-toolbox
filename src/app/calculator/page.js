"use client";
import CalculatorHeader from "@/components/calculator/header";
import "./calculator.css";
import CourseList from "@/components/calculator/courseList";
import { useState, useEffect } from "react";
import Title from "@/components/title"

export default function CalculatorPage() {
  const crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);

  const [isInputNameEmpty, setIsInputNameEmpty] = useState(true);
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState();
  const [gpa, setGpa] = useState("X");

  const handleNewCourseInput = (event) => {
    const inputValue = event.target.value;
    setIsInputNameEmpty(inputValue.trim() === "");
    setCourseName(inputValue);
  };

  const handleNewCourse = () => {
    setCourses([...courses, { id: crypto.getRandomValues(array), courseName }]);
    setCourseName("");
    document.getElementById("course-input").value = "";
    setIsInputNameEmpty(true);
  };

  const handleCourseDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  /**
   * Updates the 'gradePoint' field courses in the 'courses' array. This function is passed into 'CourseList' components and
   * is ultimately called in the useEffect hook of 'Course' components.
   *
   * @param {*} id
   * @param {*} gradePoint
   */
  const handleAverageUpdate = (id, gradePoint) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, gradePoint: gradePoint } : course
    );
    setCourses(updatedCourses);
  };

  /**
   * Listens for changes made to the 'courses' aray so that 'gpa' can be set accordingly.
   *
   */
  useEffect(() => {
    let newGpa = 0;
    let count = 0;

    for (let course in courses) {
      if (!isNaN(courses[course].gradePoint)) {
        newGpa += courses[course].gradePoint;
        count++;
      }
    }

    if (count > 0) {
      setGpa((newGpa / count).toFixed(2));
    } else {
      setGpa("X");
    }
  }, [courses]);

  return (
    <main>
      <div id="calculator-bar">
        <Title text="GPA Calculator" />
        <CalculatorHeader
          onNewCourseInput={handleNewCourseInput}
          onNewCourse={handleNewCourse}
          input={isInputNameEmpty}
        ></CalculatorHeader>
      </div>

      <div className="overall-grade">Current GPA:{gpa}/9</div>

      <CourseList
        courses={courses}
        onCourseDelete={handleCourseDelete}
        onAverageUpdate={handleAverageUpdate}
      ></CourseList>
    </main>
  );
}
