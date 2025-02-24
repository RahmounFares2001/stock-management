"use client";

import { FiRefreshCcw } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { useGetDepartmentsQuery } from "@/app/globalRedux/features/api/apiSlice";

// Pagination Component
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  return (
    <div className="flex gap-2 justify-center items-center pt-3">
      <button
        className="w-24 py-1 border bg-primary text-gray-200 hover:bg-gray-100 hover:text-black hover:border rounded-md"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            className={`w-8 h-8 border rounded-md ${
              page === currentPage ? "bg-primary text-gray-100" : "hover:bg-gray-100 hover:text-black"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className="w-24 py-1 border bg-primary text-gray-200 hover:bg-gray-100 hover:text-black hover:border rounded-md"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export function DepartmentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, refetch } = useGetDepartmentsQuery({ page: currentPage, limit: 5, q: "" });

  return (
    <>
      <div className="w-full flex justify-between">
        <button
          className="w-max px-6 py-1 bg-primary text-gray-100 rounded-md hover:bg-gray-100 hover:text-black border flex justify-center items-center gap-3 text-sm"
          onClick={() => refetch()}
        >
          Refresh Departments
          <FiRefreshCcw />
        </button>
      </div>

      {isLoading ? (
        <p className="text-center mt-5">Loading departments...</p>
      ) : error ? (
        <p className="text-center mt-5 text-red-500">Error fetching departments</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.departments.length > 0 ? (
                data.departments.map((dept) => (
                  <TableRow key={dept._id}>
                    <TableCell className="font-medium">{dept.name}</TableCell>
                    <TableCell>{dept.email || "No email provided"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No departments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
