import { NextRequest, NextResponse } from 'next/server';
import { courses } from '../../mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params before accessing the id
  const { id } = await params;
  
  const course = courses.find(c => c.id === parseInt(id));
  
  if (!course) {
    return NextResponse.json(
      { message: 'Course not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(course);
}