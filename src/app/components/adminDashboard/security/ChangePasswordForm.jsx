"use client";

import { useUpdatePasswordMutation } from '@/app/globalRedux/features/api/apiSlice';
import { useFormik } from 'formik';
import React from 'react';

export default function ChangePasswordForm() {
    const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

    // formik
    const formik = useFormik({
        initialValues: {
            actuelPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        },
        onSubmit: async (values, actions) => {
            if (values.newPassword !== values.repeatNewPassword) {
                alert("New passwords do not match!");
                return;
            }

            try {
                const response = await updatePassword({
                    oldPassword: values.actuelPassword,
                    newPassword: values.newPassword,
                }).unwrap();

                alert(response.message);
                actions.resetForm();
            } catch (error) {
                alert(error.data?.error || "Password update failed");
            }
        },
    });

    return (
        <div className='flex flex-col justify-center items-center gap-5 h-max'>
            <form autoComplete='off'
                onSubmit={formik.handleSubmit}
                className='w-full flex flex-col gap-5 text-sm'>

                {/* Actuel Password */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="actuelPassword">Actuel Password</label>
                    <input type="password" name='actuelPassword'
                        value={formik.values.actuelPassword}
                        onChange={formik.handleChange}
                        placeholder='Current Password'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-400 rounded-lg' />
                </div>

                {/* New Password */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" name='newPassword'
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        placeholder='New Password'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-400 rounded-lg' />
                </div>

                {/* Repeat New Password */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="repeatNewPassword">Repeat New Password</label>
                    <input type="password" name='repeatNewPassword'
                        value={formik.values.repeatNewPassword}
                        onChange={formik.handleChange}
                        placeholder='Repeat New Password'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-400 rounded-lg' />
                </div>

                <div className='w-full flex justify-center items-center'>
                    <button className='w-3/5 px-10 py-3 bg-primary text-gray-200
                        hover:bg-gray-100 hover:text-black border-primary hover:border-gray-200
                         rounded-md shadow-md shadow-gray-400 font-bold'
                        type='submit'
                        disabled={isLoading}>
                        {isLoading ? "Updating..." : "Change Password"}
                    </button>
                </div>
            </form>
        </div>
    );
}
