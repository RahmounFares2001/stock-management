import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';
import { StockItem, User } from '@/models/schema';
import { getDataFromToken } from '@/app/helpers/getDateFromToken';

connect();

export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id)
    console.log(userData)
    if (userData.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    console.log(reqBody)

    const { name, description, category, quantity } = reqBody;

    // Check if stock item already exists
    const existingItem = await StockItem.findOne({ name });
        if (existingItem) {
      return NextResponse.json({ error: "Stock item already exists" }, { status: 400 });
    }

    const newItem = new StockItem({
      name,
      description,
      category,
      quantity,
      status: quantity === 0 ? 'Out Of Stock' : quantity < 5 ? 'Low Stock' : 'Available'
    });

    await newItem.save();
    return NextResponse.json({
      message: "Stock item added successfully",
      success: true,
      item: newItem
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// gett all stock
// export async function GET(request) {
//   try {

//     const items = await StockItem.find({});
//     console.log(items)
//     return NextResponse.json({
//       items,
//       success: true
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categories = searchParams.get('categories')?.split(',') || [];
    const types = searchParams.get('types')?.split(',') || [];
    const searchQuery = searchParams.get('q') || "";
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 3;
    const skip = (page - 1) * limit;

    let query = {};
    if (categories.length > 0 && !categories.includes('All')) {
      query.category = { $in: categories };
    }
    if (types.length > 0 && !types.includes('All')) {
      query.status = { $in: types };
    }
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" }; // Case-insensitive search
    }

    const totalItems = await StockItem.countDocuments(query);
    const items = await StockItem.find(query).skip(skip).limit(limit);

    return NextResponse.json({
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      success: true
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// update stock item
export async function PUT(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    if (user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { name, description, category, quantity } = reqBody;
    const itemId = params.id;

    const updatedItem = await StockItem.findByIdAndUpdate(
      itemId,
      {
        name,
        description,
        category,
        quantity,
        status: quantity === 0 ? 'out_of_stock' : quantity < 5 ? 'low_stock' : 'available'
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Stock item updated successfully",
      success: true,
      item: updatedItem
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// delete stock item
export async function DELETE(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    if (user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const itemId = params.id;
    await StockItem.findByIdAndDelete(itemId);

    return NextResponse.json({
      message: "Stock item deleted successfully",
      success: true
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}