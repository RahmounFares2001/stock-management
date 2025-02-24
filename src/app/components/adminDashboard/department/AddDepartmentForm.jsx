"use client";

import { useFormik } from 'formik';
import * as Yup from "yup";

import React from 'react';
import { useCreateDepartmentMutation } from '@/app/globalRedux/features/api/apiSlice';

export default function AddDepartmentForm() {
    const [createDepartment, { isLoading, error }] = useCreateDepartmentMutation();

    // Form validation schema
    const validationSchema = Yup.object({
        departmentName: Yup.string().required("Department Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            departmentName: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await createDepartment(values).unwrap();
                alert("Department Added Successfully!");
                resetForm();
            } catch (err) {
                console.error("Error adding department:", err);
            }
        },
    });

    return (
        <div className='flex flex-col justify-center items-center gap-5 h-max'>
            <form 
                autoComplete='off'
                onSubmit={formik.handleSubmit}
                className='w-full flex flex-col gap-5 text-sm'
            >
                {/* Department Name */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="departmentName">Department Name</label>
                    <input 
                        type="text" 
                        name='departmentName'
                        value={formik.values.departmentName}
                        onChange={formik.handleChange}
                        placeholder='Department Name'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 rounded-lg'
                    />
                </div>

                {/* Email */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder='Email'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 rounded-lg'
                    />
                </div>

                {/* Password */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder='Password'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 rounded-lg'
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500">Failed to add department.</p>}

                {/* Submit Button */}
                <div className='w-full flex justify-center items-center'>
                    <button 
                        className='w-3/5 px-10 py-3 bg-primary text-gray-200 hover:bg-gray-100 hover:text-black border-primary hover:border-gray-200 rounded-md shadow-md shadow-gray-400 font-bold'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Adding..." : "Add Department"}
                    </button>
                </div>
            </form>
        </div>
    );
}
