import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  const accessToken = (session?.user as { token?: string })?.token;

  return NextResponse.json({ token: accessToken });
}
