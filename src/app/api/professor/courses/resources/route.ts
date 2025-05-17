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

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    const db = await connectToDatabase();
    const resources = await db.collection('resources').find({ professorId: user.userId }).sort({ uploadedAt: -1 }).toArray();
    return NextResponse.json({ resources });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Unauthorized' }, { status: 401 });
  }
} 