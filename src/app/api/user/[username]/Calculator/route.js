import { createUserModel } from "@/lib/mongodb/mongodb";
import { NextResponse } from "next/server";

/**
 * Retrieves all courses and subsequent assignment details for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function GET(req, context) {
    const username = context.params.username;
    const UserModel = await createUserModel();
    const user = await UserModel.findOne({ username });
  
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    return NextResponse.json(user.courses);
}


/**
 * Creates a new assignment for a course or creates a new course for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function POST(req, context) {
    const username = context.params.username;
    const UserModel = await createUserModel();
    const { type, courseOrAssignment } = await req.json();
  
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    try {
      // Differentiate between posting a course and assignment so they can be pushed to the correct array.
      if(type === "course"){
        user.courses.push(courseOrAssignment);
      } else if (type === "assignment"){
        // Check if the course exists
        const courseExists = user.courses.some((course) => course.courseID === courseOrAssignment.courseID);

        if (!courseExists) {
          return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Push the assignment to the correct course
        user.courses.forEach(course => {
          if(course.courseID === courseOrAssignment.courseID){
            course.assignments.push(courseOrAssignment);
          }
        });
      } else {
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
      }

      await user.save();
      return NextResponse.json(courseOrAssignment, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


/**
 * Deletes a course or assignment for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function DELETE(req, context) {
    const username = context.params.username;
    const UserModel = await createUserModel();
    const { type, deleteTarget } = await req.json();
  
    const user = await UserModel.findOne({ username });
  
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    try {
        // Differentiate between deleting a course and assignment so they can be filtered from the correct array.
        if(type === "course"){
            user.courses = user.courses.filter((course) => course.courseID !== deleteTarget.courseID);
        } else if (type === "assignment"){
            // Find the user's course that contains the assignment and filter it out
            user.courses.forEach(course => {
                if(course.courseID === deleteTarget.courseID){
                    course.assignments = course.assignments.filter((assignment) => assignment.assignmentID !== deleteTarget.assignmentID);
                }
            });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }
      await user.save();
      return new NextResponse(null, { status: 204 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


  /**
 * Updates the courses with any new grade data for the specified user
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function PATCH(req, context) {
    const { username } = context.params;
    const { type, updatedAssignmentOrCourse } = await req.json();
  
    try {
      const UserModel = await createUserModel();
      const user = await UserModel.findOne({ username });
      
      // Check if the desired fields exist in the database to be updated.
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      const courseExists = user.courses.some((course) => course.courseID === updatedAssignmentOrCourse.courseID);
      if (!courseExists) {
        return NextResponse.json({ error: "Event not found" }, { status: 404 });
      }
  
      if (type === "assignment"){
        // Get the user's course that contains the assignment and update the assignment in the relevant assignment array.
        user.courses.forEach(course => {
          if(course.courseID === updatedAssignmentOrCourse.courseID){
            const assignmentExists = course.some((assignment) => assignment.assignmentID === updatedAssignmentOrCourse.assignmentID);
            if (!assignmentExists) {
              return NextResponse.json({ error: "Event not found" }, { status: 404 });
            }
            course.assignments = course.assignments.map((assignment) =>
              assignment.assignmentID === updatedAssignmentOrCourse.assignmentID ? { ...assignment, ...updatedAssignmentOrCourse.content } : assignment
            );
          }
        });

      } else if (type === "course"){
        user.courses = user.courses.map((course) =>
          course.courseID === updatedAssignmentOrCourse.courseID ? { ...course, ...updatedAssignmentOrCourse.content } : course
        );
      } else {
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
      }
  
      // Save the user document
      await user.save();
  
      return NextResponse.json(updatedEvent, { status: 200 });
    } catch (error) {
      console.error("Error updating event:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }