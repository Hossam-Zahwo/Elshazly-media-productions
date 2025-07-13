// app/api/media/[section]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest, { params }: { params: { section: string } }) {
  try {
    const section = params.section;
    const filePath = path.join(process.cwd(), 'public', 'data', `${section.toLowerCase()}.json`);
    const body = await req.json();

    const fileData = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '[]';
    const data = JSON.parse(fileData);

    const newItem = {
      id: Date.now(),
      ...body,
    };

    data.push(newItem);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json(newItem);
  } catch (err) {
    console.error('❌ POST Error:', err);
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { section: string; id: string } }) {
  try {
    const section = params.section;
    const id = Number(params.id);
    const filePath = path.join(process.cwd(), 'public', 'data', `${section.toLowerCase()}.json`);

    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData);
    const updatedData = data.filter((item: any) => item.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ DELETE Error:', err);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
