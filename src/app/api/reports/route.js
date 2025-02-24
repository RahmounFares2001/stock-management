import { NextResponse } from "next/server";

import { getDataFromToken } from "@/app/helpers/getDateFromToken";
import { Report, User } from "@/models/schema";

export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    if (userData.role !== "department") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { itemId, type, description } = reqBody;

    const newReport = new Report({
      departmentId: user.department,
      itemId,
      type,
      description,
    });

    await newReport.save();
    return NextResponse.json({
      message: "Report created successfully",
      success: true,
      report: newReport,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;

    const filter = userData.role === "admin" || userData.role === "supervisor" 
      ? {} 
      : { departmentId: user.department };

    const totalReports = await Report.countDocuments(filter);
    const reports = await Report.find(filter)
      .populate({
        path: "departmentId",
        select: "name", // Get only the department name
      })
      .populate("itemId") // Keep item population if needed
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({
      reports,
      totalPages: Math.ceil(totalReports / limit),
      totalItems: totalReports,
      currentPage: page,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
