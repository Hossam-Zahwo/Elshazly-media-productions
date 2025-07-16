import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// `context` بيجي من الـ dynamic route [id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const section = request.nextUrl.searchParams.get('section');

  if (!section) {
    return NextResponse.json({ error: 'Section is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'data', `${section}.json`);

  try {
    const file = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(file);

    const item = data.find((i: any) => String(i.id) === id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('❌ Error reading file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
