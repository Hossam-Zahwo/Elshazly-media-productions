import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(_: NextRequest, { params }: { params: { section: string; id: string } }) {
  const { section, id } = params;
  const filePath = path.join(process.cwd(), 'public', 'data', `${section.toLowerCase()}.json`);

  const fileData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(fileData);

  const filtered = data.filter((item: any) => item.id !== Number(id));
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));

  return NextResponse.json({ success: true });
}
