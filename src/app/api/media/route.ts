import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

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
    // تحقق أولاً من وجود الملف
    await fs.access(filePath);

    const file = await fs.readFile(filePath, 'utf-8');
    let data: any[] = [];
    try {
      data = JSON.parse(file);
    } catch (jsonError) {
      return NextResponse.json({ error: 'Invalid JSON format' }, { status: 500 });
    }

    const item = data.find((i: any) => String(i.id) === id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json({ error: 'Section file not found' }, { status: 404 });
    }
    console.error('❌ Error reading file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
