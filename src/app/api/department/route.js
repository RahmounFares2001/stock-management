import { connect } from '@/dbConfig/dbConfig';
import { NextResponse } from 'next/server';

import { getDataFromToken } from '@/helpers/getDataFromToken';


import { Department } from '@/models/schema';
import { User } from 'lucide-react';

import bcryptjs from "bcryptjs";

connect();

export async function POST(request) {
  try {
    const user = await getDataFromToken(request);
    if (user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqBody = await request.json();
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
    const newDepartment = new Department({ departmentName });
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

    // For department users
    if (user.role === 'department') {
      const department = await Department.findById(user.department);
      return NextResponse.json({
        departments: [department],
        success: true
      });
    }

    const { id } = params;

    // if id provided (get department)
    if (id) {
      const department = await Department.findById(id);
      
      if (!department) {
        return NextResponse.json({ error: "Department not found" }, { status: 404 });
      }

      return NextResponse.json({
        department,
        success: true
      });
    }
    
   
    
    // For admin and supervisor, return all departments
    const departments = await Department.find({});
    return NextResponse.json({
      departments,
      success: true
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// update
export async function PUT(request, { params }) {
  try {
    const user = await getDataFromToken(request);
    if (user.role !== 'admin') {
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
    if (user.role !== 'admin') {
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