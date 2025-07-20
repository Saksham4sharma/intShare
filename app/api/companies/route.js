import dbConnect from '@/lib/dbConnect';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const companies = await Company.find({ name: new RegExp(query, 'i') }).limit(10);
    return NextResponse.json({ success: true, data: companies });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}