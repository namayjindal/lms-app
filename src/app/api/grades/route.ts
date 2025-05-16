import { NextResponse } from 'next/server';
import { grades } from '../mock-data';

export async function GET() {
  return NextResponse.json(grades);
} 