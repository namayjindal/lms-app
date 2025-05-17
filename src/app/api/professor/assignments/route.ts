import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

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
    const { title, description } = await req.json();
    if (!title || !description) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const db = await connectToDatabase();
    const result = await db.collection('assignments').insertOne({ title, description, professorId: user.userId, createdAt: new Date() });
    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unauthorized' }, { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const db = await connectToDatabase();
    const assignments = await db.collection('assignments').find({ professorId: user.userId }).toArray();
    return NextResponse.json({ assignments });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unauthorized' }, { status: 401 });
  }
} 