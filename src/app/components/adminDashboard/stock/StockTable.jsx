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
import SearchBar from "../../layouts/SearchBar";
import { FilterByCategory } from "./FilterByCategory";
import { useGetStockItemsQuery } from "@/app/globalRedux/features/api/apiSlice";
import { FilterByItemType } from "./FilterByItemType";
import { useState } from "react";

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

export function StockTable() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: stockItems, error, isLoading, refetch } = useGetStockItemsQuery({
    categories: selectedCategory ? [selectedCategory] : [],
    types: selectedType ? [selectedType] : [],
    page: currentPage,
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedType((prev) => (prev === type ? "" : type));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center py-3">
        <div className="flex flex-col gap-3 w-64">
          <FilterByCategory selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
          <FilterByItemType selectedType={selectedType} onTypeChange={handleTypeChange} />
        </div>
        <div className="flex gap-5">
          <SearchBar />
          <button
            className="w-max px-6 py-1 bg-primary text-gray-100 rounded-md hover:bg-gray-100 hover:text-black border flex justify-center items-center gap-3 text-sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            {isLoading ? "Refreshing..." : "Refresh Stock"}
            <FiRefreshCcw />
          </button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-red-500">
                Error loading stock.
              </TableCell>
            </TableRow>
          ) : stockItems?.items?.length > 0 ? (
            stockItems.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className={`text-right font-bold
                        ${item.status == "Available" ? "text-green-700" : 
                            item.status == "Low Stock" ? "text-yellow-700" :
                              "text-red-700" }`}
                >{item.status}</TableCell>
                
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No stock items found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center pt-3">
              <div className="w-full flex justify-end" >
                <Pagination 
                  totalPages={stockItems?.totalPages || 1} 
                  currentPage={currentPage} 
                  onPageChange={setCurrentPage} 
                />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
