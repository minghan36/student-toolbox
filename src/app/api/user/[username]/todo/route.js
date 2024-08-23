import { createUserModel } from "@/lib/mongodb/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * Retrieves to-do items by username
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

  return NextResponse.json(user.todos);
}

/**
 * Creates a new to-do item
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function POST(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const user = await UserModel.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const newTodo = await req.json();
  user.todos.push(newTodo);
  await user.save();

  return NextResponse.json({ message: "Todo item created" }, { status: 201 });
}

/**
 * Updates a to-do item completed status
 *
 * @param {NextRequest} req
 * @param {{params:{username: string}}} context
 * @returns {NextResponse}
 */
export async function PATCH(req, context) {
  const username = context.params.username;
  const UserModel = await createUserModel();
  const user = await UserModel.findOne({ username });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { id } = await req.json();
  const todo = user.todos.find((todo) => todo.id === id);

  if (!todo) {
    return NextResponse.json({ error: "Todo item not found" }, { status: 404 });
  }

  todo.completed = !todo.completed;
  await user.save();

  return NextResponse.json({ message: "Todo item updated" });
}
