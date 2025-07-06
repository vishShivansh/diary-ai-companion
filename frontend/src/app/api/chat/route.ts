// async function query(data) {
// 	const response = await fetch(
// 		"https://router.huggingface.co/hf-inference/models/tabularisai/multilingual-sentiment-analysis",
// 		{
// 			headers: {
// 				Authorization: `Bearer ${({}).HF_TOKEN}`,
// 				"Content-Type": "application/json",
// 			},
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	return result;
// }

// query({ inputs: "I like you. I love you" }).then((response) => {
//     console.log(JSON.stringify(response));
// });


import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const { message } = await req.json();

  const body = { message };

  const response = await fetch(
		"http://127.0.0.1:8000/chat",
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(body),
		}
	);

  const data = await response.json();

  if (data.error) {
    return NextResponse.json({ reply: `Error: ${data.error}` });
  }
  const reply = data.reply || "Hmm... something went wrong.";

  return NextResponse.json({ reply });
}


// POST({ message: "Today is a sunny day and I will get some ice cream." }).then((response) => {
//     console.log(JSON.stringify(response));
// });
