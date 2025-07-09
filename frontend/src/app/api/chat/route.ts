import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama3-70b-8192',
    });

    const choice = completion.choices?.[0];
    const rawReply = choice?.message?.content?.trim();

    if (!rawReply) {
      return NextResponse.json({ error: 'Model returned empty response.' }, { status: 500 });
    }

    // You can enhance further with custom formatting here
    const formattedReply = formatReply(rawReply);

    return NextResponse.json({
      role: choice.message.role,
      reply: formattedReply,
    });

  } catch (error: unknown) {
    console.error('[Groq API Error]', error);
    const errorMessage =
      error && typeof error === 'object' && 'message' in error
        ? (error as { message: string }).message
        : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Optional formatter — add more processing if needed
function formatReply(reply: string): string {
  // Normalize multiple newlines, trim ends
  return reply.replace(/\n{3,}/g, '\n\n').trim();
}
