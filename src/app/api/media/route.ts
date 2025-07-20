import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

// جلب كل العناصر في الملف حسب القسم (section)
export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get('section');

  if (!section) {
    return NextResponse.json({ error: 'Section is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'public', 'data', `${section}.json`);

  try {
    await fs.access(filePath);

    const file = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(file);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return NextResponse.json([], { status: 200 }); // لو الملف مش موجود، رجّع مصفوفة فاضية
    }

    console.error('❌ Error reading file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// إضافة عنصر جديد إلى القسم
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const section = req.nextUrl.searchParams.get('section');

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'data', `${section}.json`);

    let data: any[] = [];

    try {
      const file = await fs.readFile(filePath, 'utf-8');
      data = JSON.parse(file);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        console.error('❌ Error reading file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
      // لو الملف مش موجود، نبدأ بمصفوفة فاضية
    }

    const newItem = {
      ...body,
      id: Date.now(), // توليد ID مؤقت باستخدام التوقيت
    };

    data.push(newItem);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Item added successfully', item: newItem }, { status: 201 });
  } catch (error) {
    console.error('❌ POST error:', error);
    return NextResponse.json({ error: 'Invalid JSON or server error' }, { status: 400 });
  }
}
