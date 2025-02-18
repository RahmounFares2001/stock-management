export async function GET(request) {
    try {
      const user = await getDataFromToken(request);
      let inventory;
  
      if (user.role === 'admin' || user.role === 'supervisor') {
        inventory = await DepartmentInventory.find({})
          .populate('departmentId')
          .populate('itemId');
      } else {
        inventory = await DepartmentInventory.find({ 
          departmentId: user.department,
          status: 'active'
        })
          .populate('itemId');
      }
  
      return NextResponse.json({
        inventory,
        success: true
      });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }