import { getDataFromToken } from "@/app/helpers/getDateFromToken";
import { DepartmentInventory } from "@/models/schema";
import { NextResponse } from "next/server";

// Get Specific Inventory by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const inventory = await DepartmentInventory.findById(id).populate("departmentId").populate("itemId");

    if (!inventory) {
      return NextResponse.json({ error: "Inventory not found" }, { status: 404 });
    }

    return NextResponse.json({ inventory, success: true });
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
