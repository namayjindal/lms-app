import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('Please define the JWT_SECRET environment variable');

function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) throw new Error('Not authenticated');
  const user = jwt.verify(token, JWT_SECRET as string) as any;
  if (user.role !== 'professor') throw new Error('Forbidden');
  return user;
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const { url, name } = await req.json();
    if (!url || !name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const db = await connectToDatabase();
    await db.collection('resources').insertOne({ type: 'link', name, url, professorId: user.userId, uploadedAt: new Date() });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unauthorized' }, { status: 401 });
  }
} 