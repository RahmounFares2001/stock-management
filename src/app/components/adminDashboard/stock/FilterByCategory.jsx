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

const categories = [
  "All",
  "Mobilier",
  "Fournitures de bureau",
  "Équipements électroniques",
  "Matériel réseau",
  "Nettoyage & Entretien",
  "Cuisine & Restauration",
  "Sécurité & Prévention",
  "Accessoires & Périphériques",
];

export function FilterByCategory({ selectedCategory, onCategoryChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-primary text-gray-100">
          {selectedCategory ? selectedCategory : "Filter By Category"}
          <CiFilter className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-primary text-gray-200">
        <DropdownMenuLabel>Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup 
          value={selectedCategory} 
          onValueChange={onCategoryChange}  
        >
          {categories.map((category) => (
            <DropdownMenuRadioItem 
              key={category} 
              value={category} 
              className="cursor-pointer text-gray-100"
            >
              {category}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}