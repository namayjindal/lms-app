import { NextResponse } from 'next/server';
import { announcements } from '../mock-data';

export async function GET() {
  return NextResponse.json(announcements);
} 