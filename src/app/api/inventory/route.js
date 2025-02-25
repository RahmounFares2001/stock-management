import { getDataFromToken } from "@/app/helpers/getDateFromToken";
import {  DepartmentInventory, Report, StockItem, User } from "@/models/schema";
import { NextResponse } from "next/server";

// Create (Assign Inventory to Department)
export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    if (userData.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { departmentId, itemId, code, quantity } = await request.json();

    const stockItem = await StockItem.findById(itemId);
    if (!stockItem || stockItem.quantity < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }

    const newInventory = new DepartmentInventory({ departmentId, itemId, code, quantity });

    stockItem.quantity -= quantity;
    stockItem.status = 
      stockItem.quantity === 0 ? 'Out Of Stock' : 
      stockItem.quantity < 5 ? 'Low Stock' : 
      'Available';

    const pendingReports = await Report.find({
      departmentId,
      itemId,
      status: 'Pending',
    });

    console.log(pendingReports)
    let resolvedReportsCount = 0;

    for (const report of pendingReports) {
      if (report.reportedQuantity <= quantity) {
        report.status = 'Resolved';
        report.resolvedDate = new Date();
        resolvedReportsCount++;
      } else {
        report.reportedQuantity -= quantity;
      }
      await report.save();
    }

    await Promise.all([newInventory.save(), stockItem.save()]);

    return NextResponse.json({
      message: "Items assigned successfully",
      success: true,
      inventory: newInventory,
      resolvedReports: resolvedReportsCount,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get All (With Pagination)
export async function GET(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    let query = {};
    if (userData.role !== 'admin' && userData.role !== 'supervisor') {
      query = { departmentId: user.department };
    }

    const totalItems = await DepartmentInventory.countDocuments(query);
    const inventory = await DepartmentInventory.find(query)
      .populate("departmentId")
      .populate("itemId")
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      inventory,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
