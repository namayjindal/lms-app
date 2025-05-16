import { NextResponse } from 'next/server';
import { discussions } from '../mock-data';

export async function GET() {
  return NextResponse.json(discussions);
} 