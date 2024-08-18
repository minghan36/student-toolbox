import { createUserModel } from "@/lib/mongodb/mongodb";
import { NextResponse } from "next/server";

/**
 * Retrieves user data by username
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 * */
export async function GET(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const user = await UserModel.findOne({ username });

  if (!user?.animal) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ animal: user.animal });
}

/**
 * Sets the user's favourite animal
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function POST(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const { animal } = await req.json();

  try {
    await UserModel.updateOne({ username }, { $set: { animal } });
    return NextResponse.json({ animal });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
