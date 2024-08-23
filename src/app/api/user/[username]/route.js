import { createUserModel } from "@/lib/mongodb/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * Retrieves user data by username
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function GET(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const user = await UserModel.findOne
    .where("username")
    .equals(username)
    .exec();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
