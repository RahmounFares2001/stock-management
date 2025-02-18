"use client";



// icons 
import { FiRefreshCcw } from "react-icons/fi";


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import SearchBar from "../../layouts/SearchBar";
import { DepartmentsFilter } from "./DepartmentsFilter";

  
 
  
  export function DepartmentsTable() {
  
  const invoices = [{
    name: "supplier.name",
    emailAddress: "supplier.email",
    reliability: "supplier.rating",
    isFraud: "supplier.isFraud",
    place: "supplier.place",
  }];

    return (
      <>
      <div className="w-full flex justify-between" >
        <DepartmentsFilter />

        <div className="flex gap-5" >
            <SearchBar />

            <button className="w-max px-6 py-1 bg-primary text-gray-100 rounded-md
                   hover:bg-gray-100 hover:text-black border
                    flex justify-center items-center gap-3 text-sm"
                    >
                Refresh Stock
                <FiRefreshCcw />
            </button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Reliability Rating</TableHead>
            <TableHead>Is Fraud</TableHead>
            <TableHead className="text-right">Place</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell>{invoice.emailAddress}</TableCell>
              <TableCell>{invoice.reliability}</TableCell>
              <TableCell>{invoice.isFraud}</TableCell>
              <TableCell className="text-right">{invoice.place}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Page 1/1</TableCell>
            
            <TableCell className="text-right pt-3" colSpan={3}>
                <div className="flex gap-5 justify-end items-center
                            pt-3" >
                    <button className="w-24 py-1 border bg-primary text-gray-200 hover:bg-gray-100
                         hover:text-black hover:border rounded-md" >
                            Previous
                    </button>

                    <button className="w-24 py-1 border bg-primary text-gray-200 hover:bg-gray-100
                         hover:text-black hover:border rounded-md" >
                            Next
                    </button>
                </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>

    )
  }
  

