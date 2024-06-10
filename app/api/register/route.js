import { connectMongoDB } from "@/lib/mongodb"
import User from "@/models/user";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const { username, password } = await req.json()
        
        // Check if the username and password are provided
        if (!username || !password) {
            return NextResponse.json(
                { message: "Username and password are required" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();
        await User.create({ username, password: hashedPassword })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        )

    } catch (error) {
        console.error("Error during registration:", error)
        return NextResponse.json(
            { message: "An error has occurred while registering" },
            { status: 500 }
        )
    }
}
