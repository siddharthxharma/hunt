import { connectMongoDB } from "@/lib/mongodb";
import Questions from "@/models/question";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { problem, answer, level, image } = await req.json();

    if (!problem || !answer || !level) {
      return NextResponse.json(
        { message: "Required field empty" },
        { status: 400 }
      );
    }

    // Convert answer to lowercase before hashing to ensure consistency
    const transformedAnswer = answer.toLowerCase();
    const hashedAnswer = await bcrypt.hash(transformedAnswer, 10);

    // Log the transformation and hashing process
    console.log("Transformed answer: ", transformedAnswer);
    console.log("Hashed answer to be stored: ", hashedAnswer);

    await connectMongoDB();
    await Questions.create({ problem, answer: hashedAnswer, level, image });

    return NextResponse.json(
      { message: "Question added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("error occurred: ", error);
    return NextResponse.json(
      { message: "An error has occurred!" },
      { status: 500 }
    );
  }
}
