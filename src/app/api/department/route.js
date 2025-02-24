import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';



import { Department, User } from '@/models/schema';

import bcryptjs from "bcryptjs";
import { getDataFromToken } from '@/app/helpers/getDateFromToken';

connect();

export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    if (userData.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    console.log(reqBody)
    const { departmentName, email, password } = reqBody;

    // Check if department exists
    const existingDepartment = await Department.findOne({ departmentName });
    if (existingDepartment) {
      return NextResponse.json({ error: "Department already exists" }, { status: 400 });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Create department
    const newDepartment = new Department({ name: departmentName });
    const savedDepartment = await newDepartment.save();

    // Hash password and create department user
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const departmentUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'department',
      department: savedDepartment._id
    });

    await departmentUser.save();

    return NextResponse.json({
      message: "Department and account created successfully",
      success: true,
      department: savedDepartment
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




export async function GET(request) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (userData.role === "department") {
      const department = await Department.findById(userData.department);
      return NextResponse.json({
        department: department ? { ...department.toObject(), email: userData.email } : null,
        success: true,
      });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const searchTerm = url.searchParams.get("q") || "";
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    if (id) {
      const department = await Department.findById(id);
      if (!department) {
        return NextResponse.json({ error: "Department not found" }, { status: 404 });
      }

      const departmentUser = await User.findOne({ department: department._id, role: "department" });

      return NextResponse.json({
        department: {
          department: department,
          email: departmentUser?.email || null,
        },
        success: true,
      });
    }

    const query = searchTerm ? { name: { $regex: searchTerm, $options: "i" } } : {};
    const departments = await Department.find(query).skip(skip).limit(limit);
    const totalDepartments = await Department.countDocuments(query);

    const users = await User.find({ role: "department" });

    const departmentsWithEmails = departments.map((department) => {
      const departmentUser = users.find((user) => user.department?.toString() === department._id.toString());
      return {
        _id: department._id,
        name: department.name,
        email: departmentUser ? departmentUser.email : null,
      };
    });

    return NextResponse.json({
      departments: departmentsWithEmails,
      currentPage: page,
      totalPages: Math.ceil(totalDepartments / limit),
      totalDepartments,
      success: true,
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update
export async function PUT(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    if (userData.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    const departmentId = params.id;

    // update object dynamically
    const updateData = {};

    if (name) {
      updateData.name = name;
    }

    if (email) {
      updateData.email = email;
    }

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updateData.password = await bcryptjs.hash(password, salt);
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No valid fields provided for update" }, { status: 400 });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      departmentId,
      updateData,
      { new: true }
    );

    if (!updatedDepartment) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Department updated successfully",
      success: true,
      department: updatedDepartment
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    const userData = await User.findById(user.id);

    if (userData.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const departmentId = params.id;

    // Delete department user
    await User.deleteOne({ department: departmentId });
    
    // Delete department
    await Department.findByIdAndDelete(departmentId);

    return NextResponse.json({
      message: "Department and associated account deleted successfully",
      success: true
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}