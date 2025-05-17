import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password, name, role } = await req.json();
  if (!email || !password || !name || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const db = await connectToDatabase();
  const existing = await db.collection('users').findOne({ email });
  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ email, passwordHash, name, role });
  return NextResponse.json({ success: true });
} 