import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const route = "3階の階段で4階に上がり、右に進んで2つ目の部屋が事務局です。";

  return NextResponse.json({ route })
}