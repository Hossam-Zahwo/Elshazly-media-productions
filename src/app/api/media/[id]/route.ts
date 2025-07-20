import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// 📌 GET - get item by id
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

// 🗑️ DELETE - delete item by id
export async function DELETE(
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
    let data = JSON.parse(file);

    const newData = data.filter((item: any) => String(item.id) !== id);

    // لو مفيش تغيير
    if (newData.length === data.length) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
