import { NextResponse } from "next/server";

const FINAL_KEY = "curious"; 

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log("[POST] /api/escape token:", token);

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Missing token" },
        { status: 400 }
      );
    }

    if (token === FINAL_KEY) {
      return NextResponse.json({
        escaped: true,
        message: "Congratulations! You escaped.",
      });
    } else {
      return NextResponse.json({
        escaped: false,
        message: "Wrong final code!",
      });
    }
  } catch (err) {
    console.error("Error in escape endpoint:", err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
