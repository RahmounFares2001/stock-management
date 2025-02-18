"use client";

import { useFormik } from 'formik'
import React from 'react'


export default function AddDepartmentForm() {
 
    // formik
    const handleSubmit = (values, actions) => {
     
    };

    const formik = useFormik({
        initialValues: {
            supplierAddress: '',
            name: '',
            emailAddress: '',
            place: '',
        },
        onSubmit: handleSubmit,
    });
  return (
        <div className='flex flex-col justify-center items-center gap-5 h-max' >

            <form autoComplete='off'
                onSubmit={formik.handleSubmit}
                className='w-full flex flex-col gap-5 text-sm'>

                {/* supplier address */}
                <div className='w-full flex flex-col gap-2' >
                    <label htmlFor="supplierAddress">Supplier Address</label>
                    <input type="text" name='supplierAddress'
                        value={formik.values.supplierAddress}
                        onChange={formik.handleChange}
                        placeholder='Supplier Address'
                        className='border border-gray-300
                        px-3 sm:px-4 py-2 sm:py-3 text-gray-400
                        rounded-lg' />
                </div>

                {/* name */}
                <div className='w-full flex flex-col gap-2' >
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className='border border-gray-300
                        px-3 sm:px-4 py-2 sm:py-3 text-gray-400
                        rounded-lg' />
                </div>

                 {/* email address */}
                 <div className='w-full flex flex-col gap-2' >
                    <label htmlFor="emailAddress">Email Address</label>
                    <input type="email" name='emailAddress'
                        value={formik.values.emailAddress}
                        onChange={formik.handleChange}
                        className='border border-gray-300
                        px-3 sm:px-4 py-2 sm:py-3 text-gray-400
                        rounded-lg' />
                </div>

                {/* place */}
                <div className='w-full flex flex-col gap-2' >
                    <label htmlFor="place">Place</label>
                    <input type="text" name='place'
                        value={formik.values.place}
                        onChange={formik.handleChange}
                        className='border border-gray-300
                        px-3 sm:px-4 py-2 sm:py-3 text-gray-400
                        rounded-lg' />
                </div>

                
                <div className='w-full flex justify-center items-center' >
                    <button className='w-3/5 px-10 py-3 bg-primary text-gray-200
                        hover:bg-gray-100 hover:text-black border-primary hover:border-gray-200
                         rounded-md shadow-md shadow-gray-400 font-bold'
                        type='submit' >Add Stock</button>
                </div>

            </form>

        </div>

  )
}
