import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  // Mock AI response for now
  return NextResponse.json({
    reply: `That's interesting! Tell me more about "${message}" 😊`,
  });
}
