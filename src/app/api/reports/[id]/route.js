import { NextResponse } from "next/server";

import { getDataFromToken } from "@/app/helpers/getDateFromToken";
import { Report, User } from "@/models/schema";

export async function GET(request, { params }) {
  try {
    const reportId = params.id;
    const report = await Report.findById(reportId).populate("departmentId").populate("itemId");

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({
      report,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    if (userData.role !== "admin") {
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
        resolvedDate: status === "resolved" ? new Date() : undefined,
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Report updated successfully",
      success: true,
      report: updatedReport,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
