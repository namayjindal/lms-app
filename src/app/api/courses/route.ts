import { NextResponse } from 'next/server';
import { courses } from '../mock-data';

export async function GET() {
  return NextResponse.json(courses);
} 