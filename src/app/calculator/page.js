"use client";
import CourseList from "@/components/calculator/courseList";
import CalculatorHeader from "@/components/calculator/header";
import Title from "@/components/title";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import "./calculator.css";

export default function CalculatorPage() {
  const session = useSession();
  const username = session?.data?.user?.name;

  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [gpa, setGpa] = useState("X");

  /**
   * Fetch the courses associated with the user to load their saved data.
   * Will update the courses list everytime a new user is loaded.
   *
   * @param {String} username
   */
  useEffect(() => {
    if (username) {
      async function fetchCourses() {
        const response = await fetch(`/api/user/${username}/calculator`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      }

      fetchCourses();
    } else console.log("No username provided yet");
  }, [username]);

  const handleNewCourseInput = (event) => {
    setCourseName(event.target.value);
  };

  /**
   * Create a new course only if it can be successfuly saved to the database
   */
  const handleNewCourse = async () => {
    const newCourse = {
      id: nanoid(),
      courseName,
      gradePoint: null,
      totalAchieved: 0,
      averageAchieved: 0,
      courseGrade: "NA",
      assignments: [],
    };
    const response = await fetch(`/api/user/${username}/calculator`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "course",
        courseID: newCourse.id,
        courseOrAssignment: newCourse,
      }),
    });

    if (response.ok) {
      setCourses([...courses, newCourse]);
      setCourseName("");
    } else {
      alert("Failed to create course");
    }
  };

  /**
   * Removes a course with the specified id only if it is successfully deleted from the database.
   * @param {Number} id
   */
  const handleCourseDelete = async (id) => {
    const response = await fetch(`/api/user/${username}/calculator`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "course",
        deleteTarget: {
          courseID: id,
        },
      }),
    });

    if (response.ok) {
      setCourses(courses.filter((course) => course.id !== id));
    } else {
      alert("Failed to delete course");
    }
  };

  /**
   * Updates the 'gradePoint' field courses in the 'courses' array. This function is passed into 'CourseList' components and
   * is ultimately called in the useEffect hook of 'Course' components.
   *
   * @param {*} id
   * @param {*} gradePoint
   */
  const handleAverageUpdate = async (id, gradePoint) => {
    const updatedCourses = courses.map((course) =>
      course.id === id ? { ...course, gradePoint: gradePoint } : course
    );
    const response = await fetch(`/api/user/${username}/calculator`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "course",
        IDs: { courseID: id },
        updatedFields: { gradePoint },
      }),
    });

    if (response.ok) {
      setCourses(updatedCourses);
    } else {
      alert("Failed to update course");
    }
  };

  /**
   * Listens for changes made to the 'courses' array so that 'gpa' can be set accordingly.
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
          courseName={courseName}
        ></CalculatorHeader>
      </div>

      <div className="overall-grade">Current GPA:{gpa}/9</div>

      <CourseList
        courses={courses}
        username={username}
        onCourseDelete={handleCourseDelete}
        onAverageUpdate={handleAverageUpdate}
      ></CourseList>
    </main>
  );
}
