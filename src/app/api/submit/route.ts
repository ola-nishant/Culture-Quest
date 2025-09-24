import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import puzzles from "@/data/puzzles.json";

export async function POST(req: Request) {
  try {
    const { id, answer } = await req.json();
    console.log(`[POST] /api/submit id=${id} answer=${answer}`);

    if (!id || !answer) {
      return NextResponse.json(
        { correct: false, message: "Missing id or answer" },
        { status: 400 }
      );
    }

    const puzzle = puzzles.find((p) => p.id === id);
    if (!puzzle) {
      return NextResponse.json(
        { correct: false, message: "Puzzle not found" },
        { status: 404 }
      );
    }

    for (const hash of puzzle.hashes) {
      const match = await bcrypt.compare(answer.trim().toLowerCase(), hash);
      if (match) {
        console.log(`✅ Correct answer for puzzle ${id}`);
        return NextResponse.json({ correct: true });
      }
    }

    console.log(`❌ Wrong answer for puzzle ${id}`);
    return NextResponse.json({ correct: false });
  } catch (err) {
    console.error("Error verifying answer:", err);
    return NextResponse.json(
      { correct: false, message: "Server error" },
      { status: 500 }
    );
  }
}
