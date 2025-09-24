import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    console.log("[POST] /api/escape token:", token ? "received" : "missing");

    if (!token) {
      return NextResponse.json(
        { ok: false, message: "Missing token" },
        { status: 400 }
      );
    }

    console.log("Escape endpoint called, returning success");
    return NextResponse.json({
      escaped: true,
      message: "Congratulations! You escaped.",
    });
  } catch (err) {
    console.error("Error in escape endpoint:", err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
