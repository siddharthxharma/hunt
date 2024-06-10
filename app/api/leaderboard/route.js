import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function GET(req, res) {
  try {
    await connectMongoDB();

    const users = await User.find().sort({ level: -1, lastSolved: 1 }).exec();

    if (!users) {
      return new Response(JSON.stringify({ error: 'No users found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

