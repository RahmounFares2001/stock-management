'use client'

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

// icons
import { CiFilter } from "react-icons/ci";

const itemTypes = ["All", "Available", "Low Stock", "Out Of Stock"];

export function FilterByItemType({ selectedType, onTypeChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-primary text-gray-100">
          {selectedType ? selectedType : "Filter By Type"}
          <CiFilter className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-primary text-gray-200">
        <DropdownMenuLabel>Item Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedType} onValueChange={onTypeChange}>
          {itemTypes.map((type) => (
            <DropdownMenuRadioItem key={type} value={type} className="cursor-pointer text-gray-100">
              {type}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
