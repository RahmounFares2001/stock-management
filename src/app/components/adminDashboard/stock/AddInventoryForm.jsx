"use client";

import { useAddDepartmentInventoryMutation } from "@/app/globalRedux/features/api/apiSlice";
import { useFormik } from "formik";
import React, { useState } from "react";
import { DepartmentDropMenu } from "./DepartmentDropMenu";
import { useSelector } from "react-redux";

export default function AddInventoryForm() {
  // redux
  const providedRow = useSelector((state)=> state.ui.providedRow);

  // 
  const [assignInventory, { isLoading, error }] = useAddDepartmentInventoryMutation();
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      departmentId: "",
      itemId: "",
      quantity: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const q = parseInt(values.quantity)
        await assignInventory({
          departmentId: values.departmentId,
          itemId: providedRow,
          quantity: parseInt(values.quantity),
        }).unwrap();
     

        alert("Inventory Assigned Successfully");
        resetForm();
        setSelectedDepartment(null); // Reset selected department
      } catch (err) {
        console.error("Error assigning inventory:", err);
      }
    },
  });

  return (
    <>
    <div className="bg-white w-2/6 px-10 py-8 rounded shadow-md shadow-gray-400 z-50
                 flex flex-col justify-center items-center gap-5 h-max">
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-5 text-sm"
      >
        <h1 className="font-bold" >Provide Stock Items to Department</h1>
        {/* Department Selection */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="departmentId">Department</label>
          <DepartmentDropMenu 
            selectedDepartment={selectedDepartment}
            onDepartmentChange={(dept) => {
              setSelectedDepartment(dept);
              formik.setFieldValue("departmentId", dept.id); // Store ID in formik
            }}
          />
        </div>

        {/* Quantity */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            placeholder="Enter Quantity"
            className="border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center items-center">
          <button
            className="w-3/5 px-10 py-3 bg-primary text-gray-200 hover:bg-gray-100 hover:text-black border-primary hover:border-gray-200 rounded-md shadow-md shadow-gray-400 font-bold"
            type="submit"
          >
            {isLoading ? "Assigning..." : "Send Inventory"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error.data?.error || "Something went wrong"}</p>}
      </form>
    </div>


    </>
  );
}
