"use client";

import { useCreateReportMutation, useGetStockItemQuery } from "@/app/globalRedux/features/api/apiSlice";
import { useFormik } from "formik";
import React from "react";

export default function AddReportForm() {
    const [addReport, { isLoading, error }] = useCreateReportMutation();
    const { data: stockItems, isLoading: loadingStock } = useGetStockItemQuery();

    const formik = useFormik({
        initialValues: {
            itemId: "",
            type: "",
            reportedQuantity: 1,
            description: "",
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                await addReport({
                    itemId: values.itemId,
                    type: values.type,
                    reportedQuantity: values.reportedQuantity,
                    description: values.description,
                }).unwrap();

                alert("Report Added Successfully");
                resetForm();
            } catch (err) {
                console.error("Error adding report:", err);
            }
        },
    });

    return (
        <div className="absolute z-50 bg-white px-10 py-8 rounded-lg
                w-1/2
                 flex flex-col justify-center items-center gap-5 h-max">
            <form autoComplete="off" onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-5 text-sm">

                {/* Item Selection */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="itemId">Select Item</label>
                    <select
                        name="itemId"
                        value={formik.values.itemId}
                        onChange={formik.handleChange}
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                        disabled={loadingStock}
                    >
                        <option value="">Select Item</option>
                        {stockItems?.stockItems?.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                    >
                        <option value="">Select Type</option>
                        <option value="Damage">Damage</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>

                {/* Quantity */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="quantity">Reported Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formik.values.reportedQuantity}
                        onChange={formik.handleChange}
                        placeholder="Quantity"
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                    />
                </div>

                {/* Description */}
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder="Description"
                        className="border border-gray-300 px-3 py-2 rounded-lg"
                    />
                </div>

                {/* Submit Button */}
                <div className="w-full flex justify-center items-center">
                    <button
                        className="w-3/5 px-10 py-3 bg-primary text-gray-200 hover:bg-gray-100 hover:text-black border-primary hover:border-gray-200 rounded-md shadow-md font-bold"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Adding..." : "Add Report"}
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500">{error.message}</p>}
            </form>
        </div>
    );
}
