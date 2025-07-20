import dbConnect from '@/lib/dbConnect';
import Experience from '@/models/Experience';
import Company from '@/models/Company';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { companyName, role, experience, ctc } = await request.json();

    if (!companyName || !role || !experience) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    let company = await Company.findOne({ name: companyName.toUpperCase() });
    if (!company) {
      company = await Company.create({ name: companyName });
    }

    const experienceData = { company: company._id, role, experience };
    if (ctc !== undefined && ctc !== null && ctc !== '') {
      experienceData.ctc = parseFloat(ctc);
    }

    const newExperience = await Experience.create(experienceData);
    return NextResponse.json({ success: true, data: newExperience }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}