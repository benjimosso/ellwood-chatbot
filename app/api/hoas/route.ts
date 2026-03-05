import { getHoas } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hoas = await getHoas();
    return NextResponse.json(hoas);
  } catch (error) {
    console.error("Failed to fetch HOAs:", error);
    return NextResponse.json({ error: "Failed to fetch HOAs" }, { status: 500 });
  }
}
