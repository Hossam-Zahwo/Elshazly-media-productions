import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

// ✅ GET - get item by id
export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const docRef = doc(db, 'media', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('❌ Error getting document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// 🗑️ DELETE - delete item by id
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;

  if (!id) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const docRef = doc(db, 'media', id);
    await deleteDoc(docRef);

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
