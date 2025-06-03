import { getToken } from "next-auth/jwt";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const notice = await db.collection("notice").findOne({});
    if (!notice) {
      return new Response(JSON.stringify({
        success: true,
        title: { en: "Important Notice", np: "महत्वपूर्ण सूचना" },
        news: [
          { en: "Annual Sports Day Announced", np: "वार्षिक खेलकुद दिवसको घोषणा गरिएको छ।" },
          { en: "Science Exhibition Next Month", np: "अर्को महिनामा विज्ञान प्रदर्शनी आयोजना हुनेछ।" },
          { en: "New Computer Lab Inauguration", np: "नयाँ कम्प्युटर प्रयोगशाला उद्घाटन गरिएको छ।" },
          { en: "Scholarship Applications Open", np: "छात्रवृत्तिका लागि आवेदन खुला गरिएको छ।" }
        ]
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      title: notice.title,
      news: notice.news
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({
      success: false,
      error: "Could not load notice",
      news: [],
      title: { en: "Important Notice", np: "महत्वपूर्ण सूचना" }
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function PUT(request) {
  const token = await getToken({ req: request });
  if (!token || token.role !== "admin") {
    return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const body = await request.json();
    if (!body.title || !body.news || !Array.isArray(body.news)) {
      return new Response(JSON.stringify({ success: false, error: "Invalid data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const client = await clientPromise;
    const db = client.db(dbName);

    // Upsert the singleton notice document
    await db.collection("notice").updateOne(
      {},
      { $set: { title: body.title, news: body.news } },
      { upsert: true }
    );
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ success: false, error: "Failed to update notice" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
