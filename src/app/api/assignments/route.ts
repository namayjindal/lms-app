import { NextResponse } from 'next/server';
import { assignments } from '../mock-data';

export async function GET() {
  return NextResponse.json(assignments);
} 