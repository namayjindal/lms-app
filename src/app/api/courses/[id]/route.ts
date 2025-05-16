import { NextRequest, NextResponse } from 'next/server';
import { courses } from '../../mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const course = courses.find(c => c.id === parseInt(params.id));
  
  if (!course) {
    return NextResponse.json(
      { message: 'Course not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(course);
} 