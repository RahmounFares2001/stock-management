import { getDataFromToken } from "@/app/helpers/getDateFromToken";
import { DepartmentInventory, StockItem, User } from "@/models/schema";
import { NextResponse } from "next/server";

// Get Specific Inventory by ID
export async function GET(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    const departmentId = userData.department.toString();

    const departmentInventories = await DepartmentInventory.find({
      departmentId: departmentId
    })

    const itemIds = departmentInventories.map((inventory) => inventory.itemId);

    if (itemIds.length === 0) {
      return NextResponse.json({ message: "No stock items found", stockItems: [] });
    }

    // Find stock items in the inventory
    const stockItems = await StockItem.find({ _id: { $in: itemIds } });
    
    return NextResponse.json({ stockItems });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Inventory
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updateData = await request.json();

    const updatedInventory = await DepartmentInventory.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedInventory) {
      return NextResponse.json({ error: "Inventory not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Inventory updated successfully", success: true, inventory: updatedInventory });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
