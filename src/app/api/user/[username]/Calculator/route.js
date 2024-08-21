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
    const { type, courseID, courseOrAssignment } = await req.json();
    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    try {
      // Differentiate between posting a course and assignment so they can be pushed to the correct array.
      if(type === "course"){
        user.courses.push(courseOrAssignment);
      } else if (type === "assignment"){
        // Check if the course exists to avoid false positives
        const courseExists = user.courses.some((course) => course.id === courseID);

        if (!courseExists) {
          return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        // Store the assignment in the correct course
        user.courses.forEach(course => {
          if(course.id === courseID){
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
        // Keep all courses and assignments apart from the targeted item.
        if(type === "course"){
            user.courses = user.courses.filter((course) => course.id !== deleteTarget.courseID);
        } else if (type === "assignment"){

            user.courses.forEach(course => {
                if(course.id === deleteTarget.courseID){
                    course.assignments = course.assignments.filter((assignment) => assignment.id !== deleteTarget.assignmentID);
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
    const { type, IDs, updatedFields } = await req.json();
    try {
      const UserModel = await createUserModel();
      const user = await UserModel.findOne({ username });
      

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      const courseExists = user.courses.some((course) => course.id === IDs.courseID);
      if (!courseExists) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }
  
      // Only make changes to the specified type and field.
      if (type === "assignment"){
        // Check if the assignment exists to avoid false positives.
        user.courses.forEach(course => {
          if(course.id === IDs.courseID){
            const assignmentExists = course.assignments.some((assignment) => assignment.id === IDs.assignmentID);
            if (!assignmentExists) {
              return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
            }
            updateFieldsInList(course.assignments, IDs.assignmentID, updatedFields);
          }
        });
      } else if (type === "course"){
        updateFieldsInList(user.courses, IDs.courseID, updatedFields);
      } else {
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
      }
  
      await user.save();
  
      return NextResponse.json(updatedFields, { status: 200 });
    } catch (error) {
      console.error("Error updating event:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }


  /**
   * Used to update some specific fields of a specific item in a list.
   * 
   * @param {list} list 
   * @param {Number} id 
   * @param {*} fieldValues 
   */
  function updateFieldsInList(list, id, fieldValues) {
    list.forEach((item) => {
      if (item.id === id) {
        for (const key in fieldValues) {
          item[key] = fieldValues[key];
        }
      }
    });
  }