import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db(dbName);
}

function generateRandomPassword(length = 12) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const userCount = await db.collection("users").countDocuments();

    if (userCount > 0) {
      return new Response(
        JSON.stringify({ message: "Users already exist. Seeding not allowed." }),
        { status: 400 }
      );
    }

    const randomPassword = generateRandomPassword(12);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const adminUser = {
      username: "admin",
      name: "Admin",
      email: "admin@admin",
      password: hashedPassword,
      role: "admin",
      permissions: {
        books: ["all"],
        tags: ["all"]
      },
      fullName: "Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection("users").insertOne(adminUser);

    console.log("✅ Admin user seeded:");
    console.log("Username:", adminUser.username);
    console.log("Email:", adminUser.email);
    console.log("Password:", randomPassword);

    return new Response(
      JSON.stringify({ message: "Admin user created. Check console for credentials." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Seed error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error." }),
      { status: 500 }
    );
  }
}
