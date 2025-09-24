import { NextResponse } from "next/server";
import puzzles from "@/data/puzzles.json";

export async function GET() {
  try {
    return NextResponse.json(puzzles);
  } catch (err) {
    console.error("Error sending puzzles:", err);
    return NextResponse.json(
      { error: "Failed to load puzzles" },
      { status: 500 }
    );
  }
}
