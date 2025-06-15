const comments = [
  {
    id: 1,
    content: "This is the first comment.",
  },
  {
    id: 2,
    content: "This is the second comment.",
  },
  {
    id: 3,
    content: "This is the third comment.",
  },
];

export async function GET() {
  return Response.json(comments);
}

export async function POST(request: Request) {
  const comment = await request.json();
  const newComment = {
    id: comments.length + 1,
    text: comment.text,
  };

  comments.push(newComment);

  return new Response(JSON.stringify(newComment), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
