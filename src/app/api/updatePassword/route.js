import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


import { getDataFromToken } from "@/app/helpers/getDateFromToken";
import { User } from "@/models/schema";

connect();

export async function POST(request) {
    try {
        // Get user ID from token
        const userData = await getDataFromToken(request);
        if (!userData) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = userData.id;

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Get password details from request body
        const { oldPassword, newPassword } = await request.json();

        // Validate old password
        const isValidPassword = await bcryptjs.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Invalid old password" }, { status: 400 });
        }

        // Hash new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        // Update password in database
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true,
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
