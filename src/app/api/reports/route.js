import { Report } from '@/models/stockModels';

export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    if (user.role !== 'department') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { itemId, type, description } = reqBody;

    const newReport = new Report({
      departmentId: user.department,
      itemId,
      type,
      description
    });

    await newReport.save();
    return NextResponse.json({
      message: "Report created successfully",
      success: true,
      report: newReport
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const user = await getDataFromToken(request);
    let reports;

    if (user.role === 'admin' || user.role === 'supervisor') {
      reports = await Report.find({})
        .populate('departmentId')
        .populate('itemId');
    } else {
      reports = await Report.find({ departmentId: user.department })
        .populate('itemId');
    }

    return NextResponse.json({
      reports,
      success: true
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// /app/api/reports/[id]/route.js
export async function PUT(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    if (user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { status, resolution } = reqBody;
    const reportId = params.id;

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      {
        status,
        resolution,
        resolvedDate: status === 'resolved' ? new Date() : undefined
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Report updated successfully",
      success: true,
      report: updatedReport
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}