"use client";

import { useFormik } from 'formik';
import React from 'react';
import { StockCategories } from './StockCategories';
import { useAddStockItemMutation } from '@/app/globalRedux/features/api/apiSlice';

export default function AddStockForm() {
    const [addStockItem, { isLoading, error }] = useAddStockItemMutation(); // query mutation

    // formik
    const formik = useFormik({
        initialValues: {
            name: '',
            category: '', 
            quantity: '',
            description: '',
        },
        onSubmit: async (values, { resetForm }) => {
            try {
              const response = await addStockItem({
                name: values.name,
                category: values.category,
                quantity: parseInt(values.quantity), 
                description: values.description,
              }).unwrap();
      
              alert("Stock Added Successfully");
              resetForm(); 
            } catch (err) {
              console.error("Error adding stock:", err);
            }
          },
    });

    // handle category change
    const handleCategoryChange = (category) => {
        const categoryName = category.split(" (")[0];
        formik.setFieldValue("category", categoryName);
    };

    return (
        <div className='flex flex-col justify-center items-center gap-5 h-max'>
            <form autoComplete='off'
                onSubmit={formik.handleSubmit}
                className='w-full flex flex-col gap-5 text-sm'>

                {/* Category */}
                <div className='flex flex-col gap-3 w-4/5'>
                    <h1>Category</h1>
                    <StockCategories selectedCategory={formik.values.category} onCategoryChange={handleCategoryChange} />
                </div>

                {/* Item name */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="name">Item Name</label>
                    <input type="text" name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder='Item Name'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 rounded-lg'
                        disabled={formik.values.category == "" ? true : false } />
                </div>


                {/* Quantity */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name='quantity'
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        placeholder='Quantity'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 rounded-lg'
                        disabled={formik.values.category == "" ? true : false } />
                </div>

                {/* Description */}
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="description">Description</label>
                    <input type="text" name='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder='Description'
                        className='border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 rounded-lg'
                        disabled={formik.values.category == "" ? true : false } />
                </div>

                {/* Submit Button */}
                <div className='w-full flex justify-center items-center'>
                    <button className='w-3/5 px-10 py-3 bg-primary text-gray-200 hover:bg-gray-100 hover:text-black border-primary hover:border-gray-200 rounded-md shadow-md shadow-gray-400 font-bold'
                        type='submit'>Add Stock</button>
                </div>

            </form>
        </div>
    );
}
