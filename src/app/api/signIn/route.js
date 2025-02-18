import {connect} from "@/dbConfig/dbConfig";
import { User } from "@/models/schema";

// client

import bcryptjs from "bcryptjs";

import jsw from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";



connect();


export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password} = reqBody;

    
        // Check if user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        
        
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }
        console.log(user);


        // create token data
        const tokendata = {
            id: user._id,
            email: user.email
        };

        //create token
        const token = await jsw.sign(tokendata, process.env.TOKEN_SECRET, {expiresIn: '1h'});
        
        const response = NextResponse.json({
            message: 'login sucess',
            succes: true
        });
        response.cookies.set('token', token, {
            httpOnly: true,
        });


        return response;

    } catch (error) {
        return NextResponse.json({error : error.message}, {status: 500});
    }

}