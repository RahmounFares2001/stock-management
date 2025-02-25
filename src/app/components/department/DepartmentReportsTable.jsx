"use client";

// Icons
import { MdOutlineReportProblem } from "react-icons/md";


// shadcn ui
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DepartmentFilter } from "./DepartmentFilter";
import { useGetReportsQuery } from "@/app/globalRedux/features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUi } from "@/app/globalRedux/features/ui/uiSlice";

export function DepartmentReportsTable() {
  // get reports
  const { data, error, isLoading, refetch } = useGetReportsQuery(); 


  // redux
  const dispatch = useDispatch();

  const showReportForm = useSelector((state)=> state.ui.showReportForm);

  return (
    <>
      <div className="w-full flex justify-between">
        <h1 className="text-xl font-bold" >Reports Table</h1>

        <div className="flex gap-5">
          <button
            className="w-max px-6 py-2 font-bold bg-primary text-gray-100 rounded-md hover:bg-gray-100 hover:text-black border flex justify-center items-center gap-3 text-sm"
            onClick={() => 
              dispatch(setUi({key: "showReportForm", value: true}))
            } 
          >
            Add Report
            <MdOutlineReportProblem className="text-xl" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading reports...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Resolved Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.reports?.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report.itemId.name}</TableCell>
                <TableCell className={`${report.type == "Damage" ? "text-red-700" : "text-orange-700"} font-semibold`} >{report.type}</TableCell>
                <TableCell className={`${report.status == "Resolved" ? "text-green-700" : "text-yellow-700"} font-semibold`} >{report.status}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell className={`${report.resolvedDate ? "text-green-700" : "text-yellow-700"} font-semibold`}  >{report.resolvedDate ? new Date(report.resolvedDate).toLocaleDateString() : "Not Resolved Yet"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Total Reports: {data?.reports?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </>
  );
}
