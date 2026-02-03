import { NextResponse } from "next/server";
import { getMiniappManifest } from "~~/utils/miniappConfig";

export const runtime = "nodejs";

export function GET() {
  const manifest = getMiniappManifest();

  if ("error" in manifest) {
    return NextResponse.json(manifest, { status: 500 });
  }

  return NextResponse.json(manifest, { status: 200 });
}
