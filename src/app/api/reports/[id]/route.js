import { NextResponse } from "next/server";

import { getDataFromToken } from "@/app/helpers/getDateFromToken";
import { DepartmentInventory, Report, User } from "@/models/schema";

export async function GET(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    const departmentId = userData.department.toString();;

    const reports = await Report.find({ departmentId })
    .populate("itemId", "name description category quantity status")

    if (!reports) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({
      reports,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    const reqBody = await request.json();
    const { itemId, type, description, reportedQuantity } = reqBody; 

    const departmentId = userData.department.toString();
    if (!departmentId) {
      return NextResponse.json({ error: "User does not belong to any department" }, { status: 400 });
    }

    const inventoryItems = await DepartmentInventory.find({ departmentId, itemId }).sort({ createdAt: 1 }); // Sort by oldest entry first

    if (!inventoryItems.length) {
      return NextResponse.json({ error: "Item not found in department inventory" }, { status: 404 });
    }

    let remainingQuantity = reportedQuantity;

    for (let inventoryItem of inventoryItems) {
      if (remainingQuantity <= 0) break;

      if (inventoryItem.quantity >= remainingQuantity) {
        inventoryItem.quantity -= remainingQuantity;
        await inventoryItem.save();
        remainingQuantity = 0; // Fully deducted
      } else {
        remainingQuantity -= inventoryItem.quantity;
        inventoryItem.quantity = 0;
        await inventoryItem.save();
      }
    }

    if (remainingQuantity > 0) {
      return NextResponse.json({ error: "Not enough quantity in inventory" }, { status: 400 });
    }

    const newReport = new Report({
      departmentId,
      itemId,
      type,
      reportedQuantity,
      description,
    });

    await newReport.save();

    return NextResponse.json({
      message: "Report created successfully, inventory updated",
      success: true,
      report: newReport, 
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
