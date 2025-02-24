"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { useGetDepartmentsQuery } from "@/app/globalRedux/features/api/apiSlice"; // Adjust API import

import { CiFilter } from "react-icons/ci";

export function DepartmentDropMenu({ selectedDepartment, onDepartmentChange }) {
  const { data, isLoading, error } = useGetDepartmentsQuery({ page: 1, limit: 5, searchTerm: "" });
  const departments = data?.departments ?? [];

  if (isLoading) return <p>Loading departments...</p>;
  if (error) return <p>Error loading departments</p>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-primary text-gray-100">
          {selectedDepartment ? selectedDepartment.name : "Select Department"}
          <CiFilter className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-primary text-gray-200">
        <DropdownMenuLabel>Departments</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup 
          value={selectedDepartment?._id || ""} 
          onValueChange={(id) => {
            const selectedDept = departments.find((dept) => dept._id === id);
            if (selectedDept) {
              // Assurez-vous de passer l'objet département complet, incluant l'ID
              onDepartmentChange({
                id: selectedDept._id,
                name: selectedDept.name
              });
            }
          }}
        >
          {departments.map((dept) => (
            <DropdownMenuRadioItem 
              key={dept._id} 
              value={dept._id} 
              className="cursor-pointer text-gray-100"
            >
              {dept.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}