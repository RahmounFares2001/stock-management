import { DepartmentInventory } from '@/models/stockModels';

export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    if (user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { departmentId, itemId, quantity } = reqBody;

    // Check stock availability
    const stockItem = await StockItem.findById(itemId);
    if (stockItem.quantity < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 });
    }

    const newInventory = new DepartmentInventory({
      departmentId,
      itemId,
      quantity
    });

    // Update stock quantity
    stockItem.quantity -= quantity;
    stockItem.status = 
      stockItem.quantity === 0 ? 'out_of_stock' : 
      stockItem.quantity < 5 ? 'low_stock' : 
      'available';

    await Promise.all([
      newInventory.save(),
      stockItem.save()
    ]);

    return NextResponse.json({
      message: "Items assigned successfully",
      success: true,
      inventory: newInventory
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}