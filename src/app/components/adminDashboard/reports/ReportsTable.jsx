"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllReportsQuery } from "@/app/globalRedux/features/api/apiSlice";

export function ReportsTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetAllReportsQuery({ page });
  console.log(data);

  if (isLoading) return <p>Loading reports...</p>;

  return (
    <>
      <h1 className="font-bold text-xl">Reports Table</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Resolved Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.reports.map((report) => (
            <TableRow key={report._id}>
              <TableCell>{report.departmentId?.name || "N/A"}</TableCell>

              <TableCell className={`font-bold
                        ${report.type == "Damage" ? "text-red-700" : 
                          "text-orange-700" }`} >{report.type}</TableCell>
              
              <TableCell>{report.itemId.name}</TableCell>
              <TableCell>{report.reportedQuantity}</TableCell>

              <TableCell className={`font-bold
                        ${report.status == "Resolved" ? "text-green-700" : 
                          report.status == "Pending" && "text-yellow-700" }`}>{report.status}</TableCell>

              <TableCell>{report.description}</TableCell>

              <TableCell className={`${!report.resolvedDate && "text-yellow-700 font-bold"}`} >
                {report.resolvedDate
                  ? new Date(report.resolvedDate).toLocaleDateString()
                  : "Not Resolved Yet"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10}>
              <div className="flex justify-between w-full">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span>Page {page} / {data?.totalPages}</span>
                <button
                  disabled={page >= data?.totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
