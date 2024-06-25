// validate-answers/route.js
import { connectMongoDB } from "@/lib/mongodb";
import Questions from "@/models/question";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  await connectMongoDB();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { level, answer } = await req.json();

  try {
    const question = await Questions.findOne({ level: parseInt(level, 10) }).select('+answer');
    if (!question) {
      return NextResponse.json({ message: "Question not found" }, { status: 404 });
    }

    const isAnswerCorrect = await bcrypt.compare(answer.toLowerCase(), question.answer);
    if (!isAnswerCorrect) {
      return NextResponse.json({ message: "Incorrect answer" }, { status: 400 });
    }

    const user = await User.findById(token.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.level += 1;
    user.lastSolved = new Date();
    await user.save();

    return NextResponse.json({ message: "Correct answer", newLevel: user.level }, { status: 200 });
  } catch (error) {
    console.log("Error during validation: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
