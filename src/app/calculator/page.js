"use client";
import CalculatorHeader from "@/components/calculator/header";
import "./calculator.css";
import CourseList from "@/components/calculator/courseList";
import { useState, useEffect } from "react";

export default function CalculatorPage() {
  const crypto = window.crypto || window.msCrypto;
  let array = new Uint32Array(1);

  const [isInputNameEmpty, setIsInputNameEmpty] = useState(true);
  const [courses, setCourses] = useState([]); // courses array stores course objects (not course components)
  const [courseName, setCourseName] = useState();
  const [gpa, setGpa] = useState("X");

  const handleNewCourseInput = (event) => {
    const inputValue = event.target.value;
    setIsInputNameEmpty(inputValue.trim() === "");
    setCourseName(inputValue);
  };

  const handleNewCourse = () => {
    setCourses([...courses, { id: crypto.getRandomValues(array), courseName }]);
  };

  const handleCourseDelete = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  /**
   * Updates a course in 'courses' gradepoint field. Is finally called in the
   * useEffect hook of course.jsx.
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

  useEffect(() => {
    let newGpa = 0;
    // Since this hook is called whenever the 'courses' array changes, some courses in the array may not have a
    // gradePoint. Count tracks the number of courses that do.
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
      <div className="gradeCalculator">
        <CalculatorHeader
          onNewCourseInput={handleNewCourseInput}
          onNewCourse={handleNewCourse}
          input={isInputNameEmpty}
        ></CalculatorHeader>

        <div className="overallGrade">Current GPA:{gpa}/9</div>

        <CourseList
          courses={courses}
          onCourseDelete={handleCourseDelete}
          onAverageUpdate={handleAverageUpdate}
        ></CourseList>
      </div>
    </main>
  );
}
