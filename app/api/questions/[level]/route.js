import { connectMongoDB } from "@/lib/mongodb";
import Questions from "@/models/question";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req, { params }) {
  await connectMongoDB();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { level } = params;

  try {
    const question = await Questions.findOne({ level: parseInt(level, 10) });
    if (!question) {
      return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(question, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
