// https://dummyjson.com/todos
// api application programming interface

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "cv Houssein",
    users: { id: 1, email: "abdel", password: "AZE" },
  });
}
// http://localhost:3001/api/user

export async function POST(request: NextRequest) {
  const lesdonnesliwslouni = await request.json();

  //console.log("les données li safet liya l frontend hahoma: ", lesdonnesliwslouni);
  return NextResponse.json({
    message: "Données reçues",
    data: lesdonnesliwslouni,
  });
}
