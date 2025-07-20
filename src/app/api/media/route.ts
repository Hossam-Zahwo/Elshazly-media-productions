// app/api/media/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// 📦 جلب كل العناصر حسب القسم
export async function GET(request: NextRequest) {
  const section = request.nextUrl.searchParams.get('section');

  if (!section) {
    return NextResponse.json({ error: 'Section is required' }, { status: 400 });
  }

  try {
    const q = query(collection(db, 'media'), where('section', '==', section));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('❌ Error reading from Firestore:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ➕ إضافة عنصر جديد إلى القسم
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const section = req.nextUrl.searchParams.get('section');

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    const newItem = {
      ...body,
      section,
      createdAt: Date.now(),
    };

    const docRef = await addDoc(collection(db, 'media'), newItem);

    return NextResponse.json(
      { message: 'Item added successfully', item: { id: docRef.id, ...newItem } },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Error adding to Firestore:', error);
    return NextResponse.json({ error: 'Invalid JSON or server error' }, { status: 400 });
  }
}
