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
import { useGetStockItemsQuery, useUpdateStockItemMutation } from "@/app/globalRedux/features/api/apiSlice";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUi } from "@/app/globalRedux/features/ui/uiSlice";
import { useSearchParams } from "next/navigation";
import { FilterByCategory } from "../adminDashboard/stock/FilterByCategory";
import { FilterByItemType } from "../adminDashboard/stock/FilterByItemType";
import SearchBar from "../layouts/SearchBar";

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

export function StockTableSupervisor() {
  //redux
  const dispatch = useDispatch();

  // get date
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // // get search params
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  
  // get data
  const { data: stockItems, error, isLoading, refetch } = useGetStockItemsQuery({
    categories: selectedCategory ? [selectedCategory] : [],
    types: selectedType ? [selectedType] : [],
    page: currentPage,
    q: ""
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedType((prev) => (prev === type ? "" : type));
    setCurrentPage(1);
  };


  // update stock item
  const [isUpdated, setIsupdated] = useState(false);
  const [updatedRow, setUpdatedRow] = useState();

  // State for editing
  const [updatedQuantity, setUpdatedQuantity] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState(""); 

  // Initialize the update mutation
  const [updateStockItem] = useUpdateStockItemMutation();

  const handleSave = async () => {
    try {
      const result = await updateStockItem({
        itemId: updatedRow, 
        quantity: updatedQuantity, 
        description: updatedDescription,
      }).unwrap(); 

      alert("Stock item updated successfully!");

      // Reset 
      setUpdatedRow("");
      setUpdatedQuantity("");
      setUpdatedDescription("");

      // Refetch data
      refetch();
    } catch (error) {
      console.error("Failed to update stock item:", error);
    }
  };


  // handle provide 
  const providedRow = useSelector((state)=> state.ui.providedRow);

  const showProvideForm = useSelector((state)=> state.ui.showProvideForm);




  return (
    <>
      <div className="w-full flex justify-between items-center py-3">
        <div className="flex flex-col gap-3 w-64">
          <FilterByCategory selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
          <FilterByItemType selectedType={selectedType} onTypeChange={handleTypeChange} />
        </div>
        <div className="flex gap-5">
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchBar />
          </Suspense>
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
            <TableHead className="text-center" >Status</TableHead>
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
                <TableCell>
                  {updatedRow == item._id ? 
                      <input
                          type="number"
                          className="w-14 px-2 py-1 border border-gray-400 rounded"
                          value={updatedQuantity? updatedQuantity : item.quantity}
                          onChange={(e)=> {setUpdatedQuantity(e.target.value)}}
                        /> : 
                        item.quantity }</TableCell>
                <TableCell>
                  {updatedRow == item._id ? 
                    <input
                        type="text"
                        className="w-full px-2 py-1 border border-gray-400 rounded"
                        value={updatedDescription? updatedDescription: item.description}
                        onChange={(e)=> {setUpdatedDescription(e.target.value)}}
                      /> : 
                      item.description }
                </TableCell>
                <TableCell className={`font-bold text-center
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
