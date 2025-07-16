import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section } = body;

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'data', `${section.toLowerCase()}.json`);
    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
    const data = JSON.parse(fileData);

    const newItem = { id: Date.now(), ...body };
    data.push(newItem);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  const id = searchParams.get('id');

  if (!section || !id) {
    return NextResponse.json({ error: 'section and id are required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'data', `${section.toLowerCase()}.json`);
  const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
  const data = JSON.parse(fileData);

  const filtered = data.filter((item: any) => item.id !== Number(id));
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));

  return NextResponse.json({ success: true });
}
