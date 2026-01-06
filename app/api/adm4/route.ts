import { NextResponse } from "next/server"
import { findAdm4 } from "@/lib/adm4"

export async function POST(req: Request) {
  try {
    const loc = await req.json()
    const adm4 = await findAdm4(loc)
    return NextResponse.json({ adm4 })
  } catch {
    return NextResponse.json(
      { error: "Failed to lookup ADM4" },
      { status: 500 }
    )
  }
}
